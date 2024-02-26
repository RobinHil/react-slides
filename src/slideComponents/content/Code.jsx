import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Code() {
    const codeString =
`
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Définition d'une structure pour représenter un étudiant
struct Student {
    string name;
    int age;
    double gpa;
};

int main() {
    // Création d'un vecteur d'étudiants
    vector<Student> students = {
        {"Alice", 20, 3.5},
        {"Bob", 21, 3.2},
        {"Charlie", 19, 3.9},
        {"David", 22, 3.7},
        {"Eve", 20, 3.8}
    };

    // Trier les étudiants par ordre de GPA décroissant
    sort(students.begin(), students.end(), [](const Student& s1, const Student& s2) {
        return s1.gpa > s2.gpa;
    });

    // Afficher les étudiants triés
    cout << "Liste des étudiants triés par GPA décroissant :" << endl;
    for(const auto& student : students) {
        cout << "Nom: " << student.name << ", Age: " << student.age << ", GPA: " << student.gpa << endl;
    }

    return 0;
}
`;

    return (
        <SyntaxHighlighter language="cpp" style={vscDarkPlus}>
            {codeString}
        </SyntaxHighlighter>
    );
};

export default Code;
