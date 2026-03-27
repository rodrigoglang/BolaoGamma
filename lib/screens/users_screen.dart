import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class UsersScreen extends StatelessWidget {
  final String? initialUser;
  const UsersScreen({super.key, this.initialUser});

  @override
  Widget build(BuildContext context) {
    final users = FirebaseFirestore.instance.collection('users');

    return Scaffold(
      appBar: AppBar(title: Text('Users (user: ${initialUser ?? "none"})')),
      body: StreamBuilder(
        stream: users.snapshots(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) return const Center(child: CircularProgressIndicator());
          final docs = snapshot.data!.docs;

          // Optional: filter by the user if provided
          final filtered = (initialUser != null)
              ? docs.where((d) => (d.data() as Map<String, dynamic>)['Nome'] == initialUser).toList()
              : docs;

          return ListView(
            children: filtered.map((doc) {
              final data = doc.data() as Map<String, dynamic>;
              return ListTile(
                title: Text(data['Nome'] ?? ''),
                subtitle: Text('Team: ${data['Favorito']} | Scores: ${data['A1-home']} - ${data['A1-away']}'),
              );
            }).toList(),
          );
        },
      ),
    );
  }
}
