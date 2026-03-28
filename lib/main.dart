import 'dart:html' as html; // 👈 Only for Flutter Web
import 'package:flutter/material.dart';
import 'screens/matches_screen.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'firebase_options.dart';
import 'screens/users_screen.dart';
import 'screens/create_user_screen.dart';
import 'screens/fill_predictions_screen.dart';
//import 'package:intl/intl.dart';

void main() async {

  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // 🔍 Read query parameters
  final uri = Uri.base; // e.g. https://site/?user=Rodrigo
  ////////////////////////////final String? userParam = uri.queryParameters["user"]; // returns "Rodrigo"
  final String userParam = "Eskeleto23"; // For local use

  runApp(MyApp(initialUser: userParam));

}

class MyApp extends StatelessWidget {
  final String? initialUser;
  const MyApp({super.key, required this.initialUser});

/*  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bolão do Gamma',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      // The first screen the user sees
      home: const MatchesScreen(),
    );
  }
*/

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bolão do Gamma',
      home: FutureBuilder<bool>(
        future: _userExists(initialUser),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            // Still checking Firestore
            return const Scaffold(
              body: Center(child: CircularProgressIndicator()),
            );
          } else if (snapshot.hasError) {
            return Scaffold(
              body: Center(child: Text('Error: ${snapshot.error}')),
            );
          } else if (snapshot.data == true) {
            // User exists → open UsersScreen
            return FillPredictionsScreen(userName: initialUser);
          } else {
              // User does not exist → open CreateUserScreen
            return CreateUserScreen(userName: initialUser);
          }
        },
      ),
    );
  }

  /// Check if a document exists in Firestore
  Future<bool> _userExists(String? userName) async {
    final doc = await FirebaseFirestore.instance
        .collection('users')
        .where('Nome', isEqualTo: userName)
        .limit(1)
        .get();

    return doc.docs.isNotEmpty;
  }
  
}
