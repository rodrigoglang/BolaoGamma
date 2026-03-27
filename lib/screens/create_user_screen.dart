import 'package:bolaodogamma_v0/screens/fill_predictions_screen.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'fill_predictions_screen.dart';

class CreateUserScreen extends StatefulWidget {
  final String? userName;
  const CreateUserScreen({super.key, required this.userName});

  @override
  State<CreateUserScreen> createState() => _CreateUserScreenState();
}

class _CreateUserScreenState extends State<CreateUserScreen> {
  final _formKey = GlobalKey<FormState>();
  Map<String, String> welcomeTextByLanguage = {};

  String? _selectedLanguage;
  String? _selectedTeam;
  String? _selectedTimeZone;

  final List<String> possible_languages = [
    'Português 🇧🇷',
    'English 🇺🇸',
    'Deutsch 🇩🇪'
  ];

  final List<String> possible_timezones = [
    'GMT-6 (Monterrey)',
    'GMT-4 (Montreal, Cuiabá)',
    'GMT-3 (Brasília)',
    'GMT+1 (UK)',
    'GMT+2 (Erlangen)',
  ];

  final Map<String, List<String>> teamsByLanguage = {
    'Português 🇧🇷': ['Alemanha 🇩🇪', 'Brasil 🇧🇷', 'EUA 🇺🇸'],
    'English 🇺🇸': ['Brazil 🇧🇷', 'Germany 🇩🇪', 'USA 🇺🇸'],
    'Deutsch 🇩🇪': [
      'Brasilien 🇧🇷',
      'Deutschland 🇩🇪',
      'Vereinigte Staaten 🇺🇸'
    ]
  };

  final Map<String, String> languageShort = {
    'Português 🇧🇷': 'BR',
    'English 🇺🇸': 'EN',
    'Deutsch 🇩🇪': 'DE'
  };

  final Map<String, String> formTitleByLanguage = {
    'Português 🇧🇷': 'Time favorito',
    'English 🇺🇸': 'Favorite team',
    'Deutsch 🇩🇪': 'Lieblingsteam'
  };

  final Map<String, String> buttonTextByLanguage = {
    'Português 🇧🇷': 'Enviar',
    'English 🇺🇸': 'Send',
    'Deutsch 🇩🇪': 'Senden'
  };

  final Map<String, String> buttonText2ByLanguage = {
    'Português 🇧🇷': 'Fuso horário',
    'English 🇺🇸': 'Time zone',
    'Deutsch 🇩🇪': 'Zeitzone'
  };

  bool _isSaving = false;

  Future<void> _saveUser() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isSaving = true;
    });

    final userData = {
      'Nome': widget.userName,
      'Favorito': _selectedTeam,
      'Idioma': languageShort[_selectedLanguage],
      'Fuso': _selectedTimeZone,
    };

    try {
      await FirebaseFirestore.instance.collection('users').doc(userData['Nome']).set(userData);

      // Navigate to UsersScreen after saving
      if (mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (_) => FillPredictionsScreen(userName: widget.userName),
          ),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error saving user: $e')),
      );
    } finally {
      if (mounted) {
        setState(() {
          _isSaving = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    // Compute the current options based on selectedLanguage
    final teams = _selectedLanguage != null
        ? teamsByLanguage[_selectedLanguage!]!
        : <String>[];

    final formTitle = _selectedLanguage != null
        ? formTitleByLanguage[_selectedLanguage!]!
        : "Time favorito/Favorite team/Lieblingsteam" as String?;

    final buttonText = _selectedLanguage != null
        ? buttonTextByLanguage[_selectedLanguage!]!
        : "Enviar/Send/Senden" as String;

    final buttonText2 = _selectedLanguage != null
        ? buttonText2ByLanguage[_selectedLanguage!]!
        : "Fuso horário/Time zone/Zeitzone" as String;

    Map<String, String> welcomeTextByLanguage = {
      'Português 🇧🇷':
          '🇧🇷 Bem-vinda/o, ${widget.userName}! Primeiramente, nos conte seu time favorito (aquele que você vai torcer, não quem acha que vai ganhar!) e seu idioma de preferência!',
      'English 🇺🇸':
          '🇺🇸 Welcome, ${widget.userName}! First of all, tell us your favorite team (the one you will cheer for, not the one you think is going to win!) and your prefered language!',
      'Deutsch 🇩🇪':
          '🇩🇪 Willkommen, ${widget.userName}! Zuerst, verrate uns dein Lieblingsteam (das, dass du unterstützt, nicht das, vom dem du denkst, dass es gewinnen wird) und deine bevorzugte Sprache!'
    };

    final welcomeText = (_selectedLanguage != null
            ? welcomeTextByLanguage[_selectedLanguage!]
            : null) ??
        'Bem-vinda/o, ${widget.userName}! Primeiramente, nos conte seu time favorito (aquele que você vai torcer, não quem acha que vai ganhar!) e seu idioma de preferência!\n\nWelcome, ${widget.userName}! First of all, tell us your favorite team (the one you will cheer for, not the one you think is going to win!) and your prefered language!\n\nWillkommen, ${widget.userName}! Zuerst, verrate uns dein Lieblingsteam (das, dass du unterstützt, nicht das, vom dem du denkst, dass es gewinnen wird) und deine bevorzugte Sprache!'
            as String;

    if (_selectedTeam != null && !teams.contains(_selectedTeam)) {
      _selectedTeam = null;
    }

    return Scaffold(
      //appBar: AppBar(title: const Text('Create User')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            // ✅ Welcome text
            Text(
              welcomeText,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 24),

            Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Language dropdown
                  DropdownButtonFormField<String>(
                    value: _selectedLanguage,
                    decoration: const InputDecoration(
                        labelText: 'Idioma/Language/Sprache'),
                    items: possible_languages.map((possible_language) {
                      return DropdownMenuItem<String>(
                        value: possible_language,
                        child: Text(possible_language),
                      );
                    }).toList(),
                    onChanged: (value) {
                      setState(() {
                        _selectedLanguage = value;
                      });
                    },
                    validator: (value) =>
                        value == null || value.isEmpty ? 'Escolha um idioma/Select a language/Wähl eine Sprache' : null,
                  ),

                  const SizedBox(height: 16),

                  // Test dropdown
                  DropdownButtonFormField<String>(
                    value: _selectedTeam,
                    decoration: InputDecoration(labelText: formTitle),
                    items: teams.map((team) {
                      return DropdownMenuItem<String>(
                        value: team,
                        child: Text(team),
                      );
                    }).toList(),
                    onChanged: (value) {
                      setState(() {
                        _selectedTeam = value;
                      });
                    },
                    validator: (value) =>
                        value == null || value.isEmpty ? 'Escolha um time/Select a team/Wähl ein Team' : null,
                  ),

                  /* Gonna read the timezone directly
                  const SizedBox(height: 16),

                  DropdownButtonFormField<String>(
                    value: _selectedTimeZone,
                    decoration: InputDecoration(
                        labelText: buttonText2),
                    items: possible_timezones.map((possible_timezone) {
                      return DropdownMenuItem<String>(
                        value: possible_timezone,
                        child: Text(possible_timezone),
                      );
                    }).toList(),
                    onChanged: (value) {
                      setState(() {
                        _selectedTimeZone = value;
                      });
                    },
                    validator: (value) =>
                        value == null || value.isEmpty ? 'Escolha um fuso horário/Choose a time zone/Wähl eine Zeitzone' : null,
                  ),
                  */
                  const SizedBox(height: 24),

                  // Send button
                  ElevatedButton(
                    onPressed: _isSaving ? null : _saveUser,
                    child: _isSaving
                        ? const CircularProgressIndicator(color: Colors.white)
                        : Text(buttonText),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
