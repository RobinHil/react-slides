import { CenterLayout, Code, Heading, Paragraph, TwoColumnLayout } from '../slideComponents/index.jsx';

function Code_area() {
    return (
        <CenterLayout>
            <Heading align="center" fontSize={8}>Code</Heading>
            <br /><br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Heading align="center">Thème sombre</Heading>
                    <br />
                    <Code language="cpp">{
`#include <iostream>
using namespace std;

template <typename T>
T moyenne(T tableau[], int taille) {
    T somme = 0;
    for (int i = 0; i < taille; i++) {
        somme += tableau[i];
    }
    return somme / taille;
}

int main() {
    int tableauEntiers[] = {1, 2, 3, 4, 5};
    double tableauReels[] = {1.1, 2.2, 3.3, 4.4, 5.5};

    cout << "Moyenne des entiers : " << moyenne(tableauEntiers, 5) << endl;
    cout << "Moyenne des réels : " << moyenne(tableauReels, 5) << endl;

    return 0;
}`
                    }</Code>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Heading align="center">Thème clair</Heading>
                    <br />
                    <Code theme="light" language="cpp">{
`#include <iostream>
using namespace std;

template <typename T>
T moyenne(T tableau[], int taille) {
    T somme = 0;
    for (int i = 0; i < taille; i++) {
        somme += tableau[i];
    }
    return somme / taille;
}

int main() {
    int tableauEntiers[] = {1, 2, 3, 4, 5};
    double tableauReels[] = {1.1, 2.2, 3.3, 4.4, 5.5};

    cout << "Moyenne des entiers : " << moyenne(tableauEntiers, 5) << endl;
    cout << "Moyenne des réels : " << moyenne(tableauReels, 5) << endl;

    return 0;
}`
                    }</Code>
                </CenterLayout>}
            />
        </CenterLayout>
    );
}

export default Code_area;