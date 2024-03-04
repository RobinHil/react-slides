import { CenterLayout, Heading, Table } from '../slideComponents/index.jsx';

function Tables() {
    return (
        <CenterLayout>
            <Heading align="center" fontSize={8}>Tableaux</Heading>
            <br /><br />
            <Table fontSize={5} divider="gray" content={[
                ["", <Heading fontSize={2}>Mathématiques</Heading>,
                     <Heading fontSize={2}>Français</Heading>,
                     <Heading fontSize={2}>Histoire</Heading>,
                     <Heading fontSize={2}>Sciences</Heading>,
                     <Heading fontSize={2}>Anglais</Heading>,
                     <Heading fontSize={2}>Physique</Heading>,
                     <Heading fontSize={2}>Chimie</Heading>,
                     <Heading fontSize={2}>Géographie</Heading>,
                     <Heading fontSize={2}>Arts</Heading>,
                     <Heading fontSize={2}>Sport</Heading>
                ],
                [<Heading fontSize={2}>Alice Dupont</Heading>, "15/20", "14/15", "13/13", "10/10", "17/20", "14/20", "11/20", "5/10", "9/10", "19/20"],
                [<Heading fontSize={2}>Bob Martin</Heading>, "14/20", "13/15", "12/13", "9/10", "16/20", "12/20", "10/20", "4/10", "8/10", "18/20"],
                [<Heading fontSize={2}>Claire Lambert</Heading>, "16/20", "15/15", "14/13", "11/10", "18/20", "15/20", "12/20", "6/10", "10/10", "20/20"],
                [<Heading fontSize={2}>David Rousseau</Heading>, "13/20", "12/15", "11/13", "8/10", "15/20", "11/20", "9/20", "3/10", "7/10", "17/20"],
                [<Heading fontSize={2}>Emma Dubois</Heading>, "17/20", "16/15", "15/13", "12/10", "19/20", "16/20", "13/20", "7/10", "11/10", "21/20"],
                [<Heading fontSize={2}>Fabien Petit</Heading>, "12/20", "11/15", "10/13", "7/10", "14/20", "10/20", "8/20", "2/10", "6/10", "16/20"],
                [<Heading fontSize={2}>Gabrielle Lefevre</Heading>, "18/20", "17/15", "16/13", "13/10", "20/20", "17/20", "14/20", "8/10", "12/10", "22/20"],
                [<Heading fontSize={2}>Hugo Garcia</Heading>, "11/20", "10/15", "9/13", "6/10", "13/20", "9/20", "7/20", "1/10", "5/10", "15/20"],
                [<Heading fontSize={2}>Isabelle Moreau</Heading>, "14/20", "13/15", "12/13", "9/10", "16/20", "12/20", "10/20", "4/10", "8/10", "18/20"],
                [<Heading fontSize={2}>Jean Dupuis</Heading>, "16/20", "15/15", "14/13", "11/10", "18/20", "15/20", "12/20", "6/10", "10/10", "20/20"]
            ]} />
        </CenterLayout>
    );
}

export default Tables;