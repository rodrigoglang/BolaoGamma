import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class FillPredictionsScreen extends StatefulWidget {
  final String? userName;

  const FillPredictionsScreen({super.key, required this.userName});

  @override
  State<FillPredictionsScreen> createState() => _FillPredictionsScreenState();
}

class _FillPredictionsScreenState extends State<FillPredictionsScreen> {
  List<dynamic> _matches = [];
  final Map<int, TextEditingController> _scoreAControllers = {};
  final Map<int, TextEditingController> _scoreBControllers = {};
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  String _language = "BR";
  String? _selectedChamp;
  String? _selectedRunner;
  String? _selectedTopScorer;

  // Completion status — updated in real time
  List<bool> _preencheuGrupo = List.generate(12, (_) => false);
  bool _preencheuGerais = false;

  @override
  void initState() {
    super.initState();
    _loadSchedule();
    for (int n = 0; n < 12; n++) {
      _computeRanking(n);
    }
  }

  final Map<String, String> groupTitle = {
    'BR': 'Grupo',
    'EN': 'Group',
    'DE': 'Gruppe'
  };

  final Map<String, String> pageTitle = {
    'BR': 'Palpites',
    'EN': 'Guesses',
    'DE': 'Vermutungen'
  };

  final Map<String, String> column0 = {
    'BR': 'Data',
    'EN': 'Date',
    'DE': 'Datum'
  };

  final Map<String, String> column1 = {
    'BR': 'Horário',
    'EN': 'Time',
    'DE': 'Zeit'
  };

  final Map<String, String> column2 = {
    'BR': 'Time A',
    'EN': 'Team A',
    'DE': 'Team A'
  };

  final Map<String, String> column3 = {
    'BR': 'Resultado A',
    'EN': 'Score A',
    'DE': 'Punktzahl A'
  };

  final Map<String, String> column4 = {
    'BR': 'Resultado B',
    'EN': 'Score B',
    'DE': 'Punktzahl B'
  };

  final Map<String, String> column5 = {
    'BR': 'Time B',
    'EN': 'Team B',
    'DE': 'Team B'
  };

  final Map<String, String> column6 = {
    'BR': 'Local',
    'EN': 'Venue',
    'DE': 'Ort'
  };

  final Map<String, String> saved = {
    'BR': 'Salvo',
    'EN': 'Saved',
    'DE': 'Gespeichert'
  };

  final Map<String, String> error1 = {
    'BR': 'Entre um resultado válido',
    'EN': 'Enter a valid result',
    'DE': 'Gib Sie ein gültiges Ergebnis ein'
  };

  final Map<String, String> rankingTxt = {
    'BR': 'Classificação',
    'EN': 'Standings',
    'DE': 'Platzierungen'
  };

  final Map<String, String> jogosTxt = {
    'BR': 'Jogos',
    'EN': 'Matches',
    'DE': 'Spiele'
  };

  final Map<String, String> titleChamp = {
    'BR': 'Campeão',
    'EN': 'Champions',
    'DE': 'Sieger'
  };

  final Map<String, String> titleRunner = {
    'BR': 'Vice-campeão',
    'EN': 'Runner-up',
    'DE': 'Zweitplatzierter'
  };

  final Map<String, String> titleScorer = {
    'BR': 'Artilheiro',
    'EN': 'Top scorer',
    'DE': 'Torschützenkönig'
  };

  final Map<String, List<String>> countries = {
    'BR': [
      '🇩🇿 Argélia', '🇦🇷 Argentina', '🇦🇺 Austrália', '🇦🇹 Áustria',
      '🇧🇪 Bélgica', '🇧🇷 Brasil', '🇨🇲 Camarões', '🇨🇦 Canadá',
      '🇶🇦 Catar', '🇨🇱 Chile', '🇨🇳 China', '🇨🇴 Colômbia',
      '🇰🇷 Coreia do Sul', '🇨🇷 Costa Rica', '🇨🇮 Costa do Marfim', '🇭🇷 Croácia',
      '🇨🇼 Curaçao', '🇪🇬 Egito', '🇪🇨 Equador', '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escócia',
      '🇸🇰 Eslováquia', '🇸🇮 Eslovênia', '🇪🇸 Espanha', '🇺🇸 Estados Unidos',
      '🇫🇷 França', '🇬🇭 Gana', '🇩🇪 Alemanha', '🇭🇹 Haiti',
      '🇳🇱 Holanda', '🇭🇳 Honduras', '🇭🇺 Hungria', '🇮🇷 Irã',
      '🇮🇪 Irlanda', '🇮🇸 Islândia', '🇯🇵 Japão', '🇯🇴 Jordânia',
      '🇲🇦 Marrocos', '🇲🇽 México', '🇳🇬 Nigéria', '🇳🇴 Noruega',
      '🇳🇿 Nova Zelândia', '🇵🇦 Panamá', '🇵🇾 Paraguai', '🇵🇪 Peru',
      '🇵🇹 Portugal', '🇸🇳 Senegal', '🇨🇭 Suíça', '🇹🇳 Tunísia',
      '🇺🇾 Uruguai', '🇺🇿 Uzbequistão',
    ],
    'EN': [
      '🇩🇿 Algeria', '🇦🇷 Argentina', '🇦🇺 Australia', '🇦🇹 Austria',
      '🇧🇪 Belgium', '🇧🇷 Brazil', '🇨🇲 Cameroon', '🇨🇦 Canada',
      '🇨🇱 Chile', '🇨🇳 China', '🇨🇴 Colombia', '🇨🇷 Costa Rica',
      '🇭🇷 Croatia', '🇨🇼 Curacao', '🇪🇨 Ecuador', '🇪🇬 Egypt',
      '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', '🇫🇷 France', '🇩🇪 Germany', '🇬🇭 Ghana',
      '🇭🇹 Haiti', '🇳🇱 Netherlands', '🇭🇳 Honduras', '🇭🇺 Hungary',
      '🇮🇸 Iceland', '🇮🇷 Iran', '🇮🇪 Ireland', '🇨🇮 Ivory Coast',
      '🇯🇵 Japan', '🇯🇴 Jordan', '🇲🇽 Mexico', '🇲🇦 Morocco',
      '🇳🇿 New Zealand', '🇳🇬 Nigeria', '🇳🇴 Norway', '🇵🇦 Panama',
      '🇵🇾 Paraguay', '🇵🇪 Peru', '🇵🇹 Portugal', '🇶🇦 Qatar',
      '🇸🇦 Saudi Arabia', '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland', '🇸🇳 Senegal', '🇸🇰 Slovakia',
      '🇸🇮 Slovenia', '🇰🇷 South Korea', '🇪🇸 Spain', '🇨🇭 Switzerland',
      '🇹🇳 Tunisia', '🇺🇾 Uruguay', '🇺🇸 USA', '🇺🇿 Uzbekistan',
    ],
    'DE': [
      '🇩🇿 Algerien', '🇦🇷 Argentinien', '🇦🇺 Australien', '🇦🇹 Österreich',
      '🇧🇪 Belgien', '🇧🇷 Brasilien', '🇨🇲 Kamerun', '🇨🇦 Kanada',
      '🇨🇱 Chile', '🇨🇳 China', '🇨🇴 Kolumbien', '🇨🇷 Costa Rica',
      '🇭🇷 Kroatien', '🇨🇼 Curaçao', '🇪🇨 Ecuador', '🇪🇬 Ägypten',
      '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', '🇨🇮 Elfenbeinküste', '🇫🇷 Frankreich', '🇩🇪 Deutschland',
      '🇬🇭 Ghana', '🇭🇹 Haiti', '🇭🇳 Honduras', '🇭🇺 Ungarn',
      '🇮🇸 Island', '🇮🇷 Iran', '🇮🇪 Irland', '🇯🇵 Japan',
      '🇯🇴 Jordanien', '🇶🇦 Katar', '🇲🇽 Mexiko', '🇲🇦 Marokko',
      '🇳🇱 Niederlande', '🇳🇿 Neuseeland', '🇳🇬 Nigeria', '🇳🇴 Norwegen',
      '🇵🇦 Panama', '🇵🇾 Paraguay', '🇵🇪 Peru', '🇵🇹 Portugal',
      '🇸🇦 Saudi-Arabien', '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Schottland', '🇸🇳 Senegal', '🇸🇰 Slowakei',
      '🇸🇮 Slowenien', '🇰🇷 Südkorea', '🇪🇸 Spanien', '🇨🇭 Schweiz',
      '🇹🇳 Tunesien', '🇺🇾 Uruguay', '🇺🇸 USA', '🇺🇿 Usbekistan',
    ],
  };

  final List<String> top_scorers = [
    'Estevão', 'Messi', 'Yuri Alberto', 'Carlos Miguel'
  ];

  final List<List<String>> teams_per_group = [
    ["MEX", "RSA", "KOR", "TBD_A"],
    ["CAN", "TBD_B", "QAT", "SUI"],
    ["BRA", "MAR", "HAI", "SCO"],
    ["USA", "PAR", "AUS", "TBD_D"],
    ["GER", "CUW", "CIV", "ECU"],
    ["NED", "JPN", "TBD_F", "TUN"],
    ["BEL", "EGY", "IRN", "NZL"],
    ["ESP", "CPV", "KSA", "URU"],
    ["FRA", "SEN", "TBD_I", "NOR"],
    ["ARG", "ALG", "AUT", "JOR"],
    ["POR", "TBD_K", "UZB", "COL"],
    ["ENG", "CRO", "GHA", "PAN"]
  ];

  final List<String> groups =
      List.generate(12, (i) => String.fromCharCode(65 + i));

  final Map<String, String> ranking0 = {'BR': 'Pts', 'EN': 'Pts', 'DE': 'Pkt'};

  final Map<String, String> ranking1 = {'BR': 'J', 'EN': 'Pl', 'DE': 'Sp'};

  final Map<String, String> ranking2 = {'BR': 'V', 'EN': 'W', 'DE': 'S'};

  final Map<String, String> ranking3 = {'BR': 'E', 'EN': 'D', 'DE': 'U'};

  final Map<String, String> ranking4 = {'BR': 'D', 'EN': 'L', 'DE': 'N'};

  final Map<String, String> ranking5 = {'BR': 'G', 'EN': 'G', 'DE': 'T'};

  final Map<String, String> ranking6 = {'BR': 'GC', 'EN': 'GA', 'DE': 'GT'};

  final Map<String, String> ranking7 = {'BR': 'SG', 'EN': 'GD', 'DE': 'TD'};

  final Map<String, String> terceiros = {'BR': 'Melhores terceiros', 'EN': 'Best third places', 'DE': 'Beste Dritte'};

  Future<void> _loadSchedule() async {
    final String jsonString =
        await rootBundle.loadString('assets/data/matches.json');
    final List<dynamic> jsonData = jsonDecode(jsonString);

    setState(() {
      _matches = jsonData;
    });

    // Initialize controllers and load previous predictions if available
    for (int n = 0; n < 12; n++) {
      for (int i = 0; i < 6; i++) {
        _scoreAControllers[i+n*6] = TextEditingController();
        _scoreBControllers[i+n*6] = TextEditingController();

        _loadPreviousPrediction(i+n*6,n);
      }
    }

    final docSnapshot = await FirebaseFirestore.instance
        .collection('users')
        .doc(widget.userName)
        .get();

    if (docSnapshot.exists) {
      final data = docSnapshot.data()!;
      final lang        = (data['Idioma'] as String?) ?? 'BR';
      final list        = countries[lang] ?? countries['BR']!;
      final savedChamp  = data['Campeao']    as String?;
      final savedRunner = data['Vice']       as String?;
      final savedScorer = data['Artilheiro'] as String?;
      final List<bool> grupoStatus = List.generate(12, (i) {
        final key = 'Preencheu\${String.fromCharCode(65 + i)}';
        return (data[key] as bool?) ?? false;
      });
      setState(() {
        _language          = lang;
        _selectedChamp     = (savedChamp  != null && list.contains(savedChamp))  ? savedChamp  : null;
        _selectedRunner    = (savedRunner != null && list.contains(savedRunner)) ? savedRunner : null;
        _selectedTopScorer = (savedScorer != null && top_scorers.contains(savedScorer)) ? savedScorer : null;
        _preencheuGrupo    = grupoStatus;
        _preencheuGerais   = (data['PreencheuGerais'] as bool?) ?? false;
      });
    } else {
      setState(() {
        _language = "BR";
      });
    }
  }

  Future<void> _saveGeneralPick(String field, String? value) async {
    if (value == null) return;
    await _firestore
        .collection('users')
        .doc(widget.userName)
        .update({field: value});

    if (mounted) {
      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(SnackBar(
          content: Text('\u2705 \${saved[_language]}!'),
          duration: const Duration(seconds: 1),
          behavior: SnackBarBehavior.floating,
        ));
    }
  }

  /// Checks if all 6 matches in a group are filled and updates Firestore + state.
  Future<void> _checkGroupCompletion(int groupn) async {
    bool allFilled = true;
    for (int i = groupn * 6; i < groupn * 6 + 6; i++) {
      final a = _scoreAControllers[i]?.text ?? '';
      final b = _scoreBControllers[i]?.text ?? '';
      if (a.isEmpty || b.isEmpty) {
        allFilled = false;
        break;
      }
    }
    final fieldName = 'Preencheu${String.fromCharCode(65 + groupn)}';
    setState(() => _preencheuGrupo[groupn] = allFilled);
    await _firestore
        .collection('users')
        .doc(widget.userName)
        .update({fieldName: allFilled});
  }

  /// Checks if all 3 general picks are filled and updates Firestore + state.
  Future<void> _checkGeraisCompletion() async {
    final filled = _selectedChamp != null &&
        _selectedRunner != null &&
        _selectedTopScorer != null;
    setState(() => _preencheuGerais = filled);
    await _firestore
        .collection('users')
        .doc(widget.userName)
        .update({'PreencheuGerais': filled});
  }

  Future<void> _loadPreviousPrediction(int index, int groupn) async {
    final docRef = _firestore
        .collection('users')
        .doc(widget.userName)
        .collection('predictions')
        .doc('Match_$index');

    final doc = await docRef.get();
    if (doc.exists) {
      final data = doc.data()!;
      _scoreAControllers[index]!.text = (data['ScoreA'] ?? '').toString();
      _scoreBControllers[index]!.text = (data['ScoreB'] ?? '').toString();
    }
    _computeRanking(groupn);
  }

  bool _isPositiveInteger(String value) {
    final int? number = int.tryParse(value);
    return number != null && number >= 0;
  }

  Future<void> _savePrediction(int index) async {
    final match = _matches[index];
    final String scoreA = _scoreAControllers[index]!.text;
    final String scoreB = _scoreBControllers[index]!.text;

    final String? _userName = widget.userName;

    final data = {
      'ScoreA': int.tryParse(scoreA),
      'ScoreB': int.tryParse(scoreB),
      'LastUpdated': FieldValue.serverTimestamp(),
    };

    await _firestore
        .collection('users')
        .doc(widget.userName)
        .collection('predictions')
        .doc('Match_$index')
        .set(data);

    if (mounted) {
      ScaffoldMessenger.of(context)
        ..hideCurrentSnackBar()
        ..showSnackBar(
          SnackBar(
            content: Text('✅ ${saved[_language]}!'),
            duration: Duration(seconds: 1),
            behavior: SnackBarBehavior.floating,
          ),
        );
    }
  }

  List<Map<String, Map<String, int>>> _ranking = List.generate(12, (_) => {});
  List<String> _bestThirds = List.generate(12, (_)=>'');
  List _thirdsOrder = [0,1,2,3,4,5,6,7,8,9,10,11];
  //List<Map<String, int>> _terceiros = List.generate((_) => {});

  void _initRanking(int groupn) {
    final List<String> _teams = teams_per_group[groupn];

    final Map<String, Map<String, int>> standings = {};

    for (final team in _teams) {
      standings.putIfAbsent(
          team,
          () => {
                'Pts': 0,
                'P': 0,
                'W': 0,
                'D': 0,
                'L': 0,
                'GF': 0,
                'GA': 0,
                'GD': 0
              });
    }

    setState(() {
      _ranking[groupn] = standings;
    });
  }

  Future<void> _orderThirds() async {

    for (int i=0;i<12;i++) {
      for (int j=i+1;j<12;j++){

        bool skip = false;
        bool flip = false;

        if ( _bestThirds[_thirdsOrder[i]] == '' && _bestThirds[_thirdsOrder[j]] == '') { continue; }
        if ( _bestThirds[_thirdsOrder[i]] == '' && _bestThirds[_thirdsOrder[j]] == '') {
          skip=true;
          flip=true;
        }

        if (!skip) {

          final Map<String, int> dataA = _ranking[_thirdsOrder[i]][_bestThirds[_thirdsOrder[i]]]!;
          final Map<String, int> dataB = _ranking[_thirdsOrder[j]][_bestThirds[_thirdsOrder[j]]]!;

          if (dataA['Pts']! < dataB['Pts']!) { flip=true; }
          else {
            if (dataA['W']! < dataB['W']!) { flip=true; }
            else{
              if (dataA['GD']! < dataB['GD']!) { flip=true; }
              else{
                if (dataA['GF']! < dataB['GF']!) { flip=true; }
              }
            }
          }

        }

        if (flip) {

          int temp = _thirdsOrder[i];
          _thirdsOrder[i] = _thirdsOrder[j];
          _thirdsOrder[j] = temp;

        }

      }
    }

  }

  Future<void> _computeRanking(int groupn) async {    
    _initRanking(groupn);

    final Map<String, Map<String, int>> standings = _ranking[groupn];

    for (int i = 0+groupn*6; i < 6+groupn*6; i++) {
      final match = _matches[i]; // access the match at this index
      final teamA = match['TimeCasa'];
      final teamB = match['TimeFora'];

      final docSnapshot = await FirebaseFirestore.instance
          .collection('users')
          .doc(widget.userName)
          .collection('predictions')
          .doc('Match_${i}')
          .get();

      if (!docSnapshot.exists) return;

      if (docSnapshot['ScoreA'] == null || docSnapshot['ScoreB'] == null)
        continue;

      final scoreA = docSnapshot['ScoreA'] as int;
      final scoreB = docSnapshot['ScoreB'] as int;

      // standings.putIfAbsent(
      //     teamA,
      //     () => {
      //           'Pts': 0,
      //           'P': 0,
      //           'W': 0,
      //           'D': 0,
      //           'L': 0,
      //           'GF': 0,
      //           'GA': 0,
      //           'GD': 0
      //         });
      // standings.putIfAbsent(
      //     teamB,
      //     () => {
      //           'Pts': 0,
      //           'P': 0,
      //           'W': 0,
      //           'D': 0,
      //           'L': 0,
      //           'GF': 0,
      //           'GA': 0,
      //           'GD': 0
      //         });

      standings[teamA]!['P'] = standings[teamA]!['P']! + 1;
      standings[teamB]!['P'] = standings[teamB]!['P']! + 1;
      standings[teamA]!['GF'] = standings[teamA]!['GF']! + scoreA;
      standings[teamA]!['GA'] = standings[teamA]!['GA']! + scoreB;
      standings[teamB]!['GF'] = standings[teamB]!['GF']! + scoreB;
      standings[teamB]!['GA'] = standings[teamB]!['GA']! + scoreA;
      standings[teamA]!['GD'] = standings[teamA]!['GD']! + scoreA - scoreB;
      standings[teamB]!['GD'] = standings[teamB]!['GD']! + scoreB - scoreA;

      if (scoreA > scoreB) {
        standings[teamA]!['Pts'] = standings[teamA]!['Pts']! + 3;
        standings[teamA]!['W'] = standings[teamA]!['W']! + 1;
        standings[teamB]!['L'] = standings[teamB]!['L']! + 1;
      } else if (scoreA < scoreB) {
        standings[teamB]!['Pts'] = standings[teamB]!['Pts']! + 3;
        standings[teamA]!['L'] = standings[teamA]!['L']! + 1;
        standings[teamB]!['W'] = standings[teamB]!['W']! + 1;
      } else {
        standings[teamA]!['Pts'] = standings[teamA]!['Pts']! + 1;
        standings[teamB]!['Pts'] = standings[teamB]!['Pts']! + 1;
        standings[teamA]!['D'] = standings[teamA]!['D']! + 1;
        standings[teamB]!['D'] = standings[teamB]!['D']! + 1;
      }
    }

    final sortedTeams = standings.entries.toList()
      ..sort((a, b) {
        final statsA = a.value;
        final statsB = b.value;

        // Sort by Pts descending
        int cmp = statsB['Pts']!.compareTo(statsA['Pts']!);
        if (cmp != 0) return cmp;

        // Sort by W descending
        cmp = statsB['W']!.compareTo(statsA['W']!);
        if (cmp != 0) return cmp;

        // Sort by GD descending
        cmp = statsB['GD']!.compareTo(statsA['GD']!);
        if (cmp != 0) return cmp;

        // Sort by GF descending
        return statsB['GF']!.compareTo(statsA['GF']!);
      });

    _bestThirds[groupn] = sortedTeams[2].key;

    _orderThirds();

    setState(() {
      _ranking[groupn] = Map.fromEntries(sortedTeams);
    });

  }

  @override
  void dispose() {
    for (final controller in _scoreAControllers.values) {
      controller.dispose();
    }
    for (final controller in _scoreBControllers.values) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {

    // Guard: show loading spinner until matches JSON is loaded
    if (_matches.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: Text('${pageTitle[_language]} - ${widget.userName}')),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    final List<DataRow> bestThirdRows = [];

    for (int pos = 0; pos < 12; pos++) {
      int group = _thirdsOrder[pos];
      final team = _bestThirds[group];
      if (team == '') continue;

      final Map<String, int> data = _ranking[group][team]!;

      final bool highlight4 =
          (data['P']?.toString() == '3') && (pos <= 8);

      bestThirdRows.add(
        DataRow(
          color: MaterialStateProperty.resolveWith<Color?>(
            (Set<MaterialState> states) {
              if (highlight4) {
                return Colors.green[700];
              }
              return null; // default background
            },
          ),
          cells: [
            DataCell(Text(team)),
            DataCell(Text('${data['Pts'] ?? ''}')),
            DataCell(Text('${data['P'] ?? ''}')),
            DataCell(Text('${data['W'] ?? ''}')),
            DataCell(Text('${data['D'] ?? ''}')),
            DataCell(Text('${data['L'] ?? ''}')),
            DataCell(Text('${data['GF'] ?? ''}')),
            DataCell(Text('${data['GA'] ?? ''}')),
            DataCell(Text('${data['GD'] ?? ''}')),
          ],
        ),
      );
    }

    return Scaffold(
      appBar:
          AppBar(title: Text('${pageTitle[_language]} - ${widget.userName}')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        scrollDirection: Axis.vertical,
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          // ── General picks ────────────────────────────────────────────────
          ExpansionTile(
            initiallyExpanded: true,
            title: Text(
              '${_preencheuGerais ? "🟢" : "🔴"} '
              '${_language == "DE" ? "Allgemeine Tipps" : _language == "EN" ? "General picks" : "Palpites gerais"}',
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                child: Column(
                  children: [
                    DropdownButtonFormField<String>(
                      value: _selectedChamp,
                      isExpanded: true,
                      decoration: InputDecoration(
                        labelText: titleChamp[_language],
                        border: const OutlineInputBorder(),
                      ),
                      items: (countries[_language] ?? countries['BR']!).map((c) =>
                          DropdownMenuItem(value: c, child: Text(c))).toList(),
                      onChanged: (value) {
                        setState(() => _selectedChamp = value);
                        _saveGeneralPick('Campeao', value);
                        _checkGeraisCompletion();
                      },
                    ),
                    const SizedBox(height: 12),
                    DropdownButtonFormField<String>(
                      value: _selectedRunner,
                      isExpanded: true,
                      decoration: InputDecoration(
                        labelText: titleRunner[_language],
                        border: const OutlineInputBorder(),
                      ),
                      items: (countries[_language] ?? countries['BR']!).map((c) =>
                          DropdownMenuItem(value: c, child: Text(c))).toList(),
                      onChanged: (value) {
                        setState(() => _selectedRunner = value);
                        _saveGeneralPick('Vice', value);
                        _checkGeraisCompletion();
                      },
                    ),
                    const SizedBox(height: 12),
                    DropdownButtonFormField<String>(
                      value: _selectedTopScorer,
                      isExpanded: true,
                      decoration: InputDecoration(
                        labelText: titleScorer[_language],
                        border: const OutlineInputBorder(),
                      ),
                      items: top_scorers.map((s) =>
                          DropdownMenuItem(value: s, child: Text(s))).toList(),
                      onChanged: (value) {
                        setState(() => _selectedTopScorer = value);
                        _saveGeneralPick('Artilheiro', value);
                        _checkGeraisCompletion();
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),

          for (int groupn = 0; groupn < 12; groupn++)
            ExpansionTile(
              initiallyExpanded: true,
              title: Text(
                '${_preencheuGrupo[groupn] ? "🟢" : "🔴"} ${groupTitle[_language]} ${groups[groupn]}',
                style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              children: [
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(
                    '${jogosTxt[_language]}',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                  DataTable(
                    columns: [
                      DataColumn(
                          label: Text('${column0[_language]}',
                              textAlign: TextAlign.center)),
                      DataColumn(
                          label: Text(
                              '${column1[_language]}\nGMT${DateTime.now().timeZoneOffset.inHours >= 0 ? '+' : ''}${DateTime.now().timeZoneOffset.inHours}',
                              textAlign: TextAlign.center)),
                      DataColumn(
                          label: Text('',
                              textAlign: TextAlign.center)),
                      DataColumn(label: Text('')),
                      DataColumn(label: Text('')),
                      DataColumn(label: Text('')),
                      DataColumn(
                          label: Text('',
                              textAlign: TextAlign.center)),
                      DataColumn(
                          label: Text('${column6[_language]}',
                              textAlign: TextAlign.center)),
                    ],
                    rows: List.generate(6, (index) {
                      final match = _matches[index+groupn*6];
                      return DataRow(cells: [
                        DataCell(Text(match['Data'] ?? '',
                            textAlign: TextAlign.center)),
                        DataCell(
                          Align(
                            alignment:
                                Alignment.center, // or .centerLeft / .center
                            child: Text(
                                '${(match['HorarioH'] + DateTime.now().timeZoneOffset.inHours).toString().padLeft(2, '0')}:${match['HorarioM'].toString().padLeft(2, '0')}',
                                textAlign: TextAlign.center),
                          ),
                        ),
                        DataCell(Text(match['TimeCasa'] ?? '',
                            textAlign: TextAlign.left)),
                        DataCell(
                          SizedBox(
                            width: 50,
                            child: TextField(
                              controller: _scoreAControllers[index+groupn*6],
                              keyboardType: TextInputType.numberWithOptions(signed: false, decimal: false),
                              textAlign: TextAlign.center,
                              inputFormatters: [
                                FilteringTextInputFormatter.digitsOnly
                              ],
                              decoration: const InputDecoration(
                                border: OutlineInputBorder(),
                              ),
                              onChanged: (value) async {
                                if (_isPositiveInteger(value) ||
                                    value.isEmpty) {
                                  await _savePrediction(index+groupn*6);
                                  await _checkGroupCompletion(groupn);
                                  _computeRanking(groupn);
                                } else if (value.isNotEmpty) {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text('${error1[_language]}'),
                                    ),
                                  );
                                  _scoreAControllers[index+groupn*6]!.clear();
                                }
                              },
                            ),
                          ),
                        ),
                        DataCell(
                          Align(
                            alignment:
                                Alignment.center, // or .centerLeft / .center
                            child: Text('x'),
                          ),
                        ),
                        DataCell(
                          SizedBox(
                            width: 50,
                            child: TextField(
                              controller: _scoreBControllers[index+groupn*6],
                              keyboardType: TextInputType.numberWithOptions(signed: false, decimal: false),
                              textAlign: TextAlign.center,
                              inputFormatters: [
                                FilteringTextInputFormatter.digitsOnly
                              ],
                              decoration: const InputDecoration(
                                border: OutlineInputBorder(),
                              ),
                              onChanged: (value) async {
                                if (_isPositiveInteger(value) ||
                                    value.isEmpty) {
                                  await _savePrediction(index+groupn*6);
                                  await _checkGroupCompletion(groupn);
                                  _computeRanking(groupn);
                                } else if (value.isNotEmpty) {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text('${error1[_language]}'),
                                    ),
                                  );
                                  _scoreBControllers[index+groupn*6]!.clear();
                                }
                              },
                            ),
                          ),
                        ),
                        DataCell(
                          Align(
                            alignment: Alignment
                                .centerRight, // or .centerLeft / .center
                            child: Text(match['TimeFora'] ?? ''),
                          ),
                        ),
                        DataCell(Text(match['Local'] ?? '')),
                      ]);
                    }),
                  ),
                  const SizedBox(height: 30),
                  Text(
                    '${rankingTxt[_language]}',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                  DataTable(
                    columns: [
                      DataColumn(label: Text('')),
                      DataColumn(label: Text('${ranking0[_language]}')),
                      DataColumn(label: Text('${ranking1[_language]}')),
                      DataColumn(label: Text('${ranking2[_language]}')),
                      DataColumn(label: Text('${ranking3[_language]}')),
                      DataColumn(label: Text('${ranking4[_language]}')),
                      DataColumn(label: Text('${ranking5[_language]}')),
                      DataColumn(label: Text('${ranking6[_language]}')),
                      DataColumn(label: Text('${ranking7[_language]}')),
                    ],
                    rows: _ranking[groupn].entries
                        .toList()
                        .asMap()
                        .entries
                        .map((mapEntry) {
                      final index = mapEntry.key as int;
                      final entry = mapEntry.value;
                      final team = entry.key;
                      final data = entry.value;
                      final pos = index + 1;
                      bool highlight_1 =
                          (data["P"]?.toString() == "3") && (pos == 1);
                      bool highlight_2 =
                          (data["P"]?.toString() == "3") && (pos == 2);
                      bool highlight_3 =
                          (data["P"]?.toString() == "3") && (pos == 3);

                      return DataRow(
                          color: MaterialStateProperty.resolveWith<Color?>(
                            (Set<MaterialState> states) {
                              if (highlight_1) {
                                return Colors.green[700];
                              } else if (highlight_2) {
                                return Colors.green[500];
                              } else if (highlight_3) {
                                return Colors.yellow[300];
                              }
                              return null; // default background
                            },
                          ),
                          cells: [
                            DataCell(Text(team)),
                            DataCell(Text('${data['Pts']}')),
                            DataCell(Text('${data['P']}')),
                            DataCell(Text('${data['W']}')),
                            DataCell(Text('${data['D']}')),
                            DataCell(Text('${data['L']}')),
                            DataCell(Text('${data['GF']}')),
                            DataCell(Text('${data['GA']}')),
                            DataCell(Text('${data['GD']}')),
                          ]);
                    }).toList(),
                  ),
                  const SizedBox(height: 16),
                    ]),   // Column children
                  ),      // Padding
                ),        // SingleChildScrollView horizontal
              ],          // ExpansionTile children
            ),            // ExpansionTile group

          ExpansionTile(
            initiallyExpanded: true,
            title: Text(
              '${terceiros[_language]}',
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            children: [
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${rankingTxt[_language]}',
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
                      ),
                      const SizedBox(height: 8),
                      DataTable(
                        columns: [
                          DataColumn(label: Text('')),
                          DataColumn(label: Text('${ranking0[_language]}')),
                          DataColumn(label: Text('${ranking1[_language]}')),
                          DataColumn(label: Text('${ranking2[_language]}')),
                          DataColumn(label: Text('${ranking3[_language]}')),
                          DataColumn(label: Text('${ranking4[_language]}')),
                          DataColumn(label: Text('${ranking5[_language]}')),
                          DataColumn(label: Text('${ranking6[_language]}')),
                          DataColumn(label: Text('${ranking7[_language]}')),
                        ],
                        rows: bestThirdRows,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ]),
      ),
    );
  }
}