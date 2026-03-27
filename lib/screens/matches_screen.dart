import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;

class MatchesScreen extends StatefulWidget {
  const MatchesScreen({super.key});

  @override
  State<MatchesScreen> createState() => _MatchesScreenState();
}

class _MatchesScreenState extends State<MatchesScreen> {
  List<dynamic> _matches = [];
  List<dynamic> _originalMatches = [];

  int? _sortColumnIndex;       // currently sorted column index
  bool? _sortAscending;  // sort direction

  @override
  void initState() {
    super.initState();
    _loadMatches();
  }

  Future<void> _loadMatches() async {
    try {
  final String jsonString =
      await rootBundle.loadString('assets/data/matches.json');
  final List<dynamic> jsonResponse = jsonDecode(jsonString);

  setState(() {
    // store the original order in _originalMatches
    _originalMatches = List<Map<String, dynamic>>.from(jsonResponse.map((e) => Map<String, dynamic>.from(e)));
    // current displayed list
    _matches = List<Map<String, dynamic>>.from(_originalMatches.map((e) => Map<String, dynamic>.from(e)));
  });
    } catch (e) {
      debugPrint('Error loading matches: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Classificação")),
      body: _matches.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: DataTable(

  headingRowColor: MaterialStateProperty.resolveWith<Color?>(
    (Set<MaterialState> states) {
      return Colors.green[600];
    },
  ),

  sortColumnIndex: _sortColumnIndex,
  sortAscending: _sortAscending ?? true,
//  sortAscending: _sortAscending,

                  columns: [
                  
                    DataColumn(
                          label: Text("Posição",style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.yellow, 
        )),
                    ),

                    DataColumn(
                          label: Text("Torcedor",style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.yellow, 
        )),                
                          onSort: (columnIndex, _) {
				  setState(() {
				    if (_sortColumnIndex != columnIndex) {
				      // New column clicked → start with ascending
				      _sortColumnIndex = columnIndex;
				      _sortAscending = true;
				    } else {
				      // Same column clicked again → cycle ascending → descending → natural
				      if (_sortAscending == null) {
					_sortAscending = true;
				      } else if (_sortAscending == true) {
					_sortAscending = false;
				      } else {
					_sortAscending = null;
					_sortColumnIndex = null;
				      }
				    }

				    // Apply sorting based on _sortAscending
				    if (_sortAscending == null) {
				      // Restore natural order
  _matches = List<Map<String, dynamic>>.from(_originalMatches.map((e) => Map<String, dynamic>.from(e)));
				    } else if (_sortAscending == true) {
				      _matches.sort((a, b) {
					final aValue = a["Torcedor"].toString();
					final bValue = b["Torcedor"].toString();
					return aValue.compareTo(bValue);
				      });
				    }
				    else {
				    _matches.sort((a, b) {
					final aValue = b["Torcedor"].toString();
					final bValue = a["Torcedor"].toString();
					return aValue.compareTo(bValue);
				      });
				    }
				  });
				},
                          
                    ),

                    DataColumn(label: Text("Pontos",style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.yellow, 
        )),),
                    DataColumn(label: Text("Resultados Cravados",style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.yellow, 
        )),),
                    DataColumn(label: Text("Campeão",style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.yellow, 
        )),),
                    DataColumn(label: Text("Artilheiro",style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.yellow, 
        )),),
                    DataColumn(label: Text("Classificados Cravados",style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.yellow, 
        )),),
                    DataColumn(label: Text("Vice Campeão",style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.yellow, 
        )),),
                  ],
  rows: _matches.map((match) {

    bool highlight_1 = match["Pos"]?.toString() == "1ª";
    bool highlight_2 = match["Pos"]?.toString() == "2ª";
    bool highlight_3 = match["Pos"]?.toString() == "3ª";
    bool highlight_z4 = match["Pos"]?.toString() == "36ª" ||
                        match["Pos"]?.toString() == "37ª" ||
                        match["Pos"]?.toString() == "38ª" ||
                        match["Pos"]?.toString() == "39ª";    

    return DataRow(
      color: MaterialStateProperty.resolveWith<Color?>(
        (Set<MaterialState> states) {
          if (highlight_1) {
            return Colors.yellowAccent[700];
          }
          else if (highlight_2) {
            return Colors.grey[400];
          }
          else if (highlight_3) {
            return Colors.amber[800];
          }
          else if (highlight_z4) {
            return Colors.red[200];
          }

          return null; // default background
        },
      ),
                          cells: [
                            DataCell(Text(match["Pos"])),
                            DataCell(Text(match["Torcedor"])),
                            DataCell(Text(match["Pts"].toString())),
                            DataCell(Text(match["RC"].toString())),
                            DataCell(Text(match["C"].toString())),
                            DataCell(Text(match["A"].toString())),
                            DataCell(Text(match["CC"].toString())),
                            DataCell(Text(match["VC"].toString())),
                          ],
                        );
                      })
                      .toList(),
                 ),
              ),
            ),
    );
  }
}

