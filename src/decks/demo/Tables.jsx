import { CenterLayout, Heading, Table } from '../../components/index.jsx';

const MARKS = [
    ["Alice Dupont", "15/20", "14/20", "13/20", "16/20", "17/20", "14/20", "11/20", "12/20", "15/20", "18/20"],
    ["Bob Martin", "14/20", "12/20", "15/20", "11/20", "16/20", "12/20", "10/20", "13/20", "14/20", "17/20"],
    ["Claire Lambert", "17/20", "16/20", "14/20", "18/20", "15/20", "16/20", "13/20", "15/20", "17/20", "19/20"],
    ["David Rousseau", "12/20", "13/20", "11/20", "14/20", "15/20", "11/20", "9/20", "12/20", "13/20", "16/20"],
    ["Emma Dubois", "18/20", "17/20", "16/20", "17/20", "19/20", "16/20", "14/20", "15/20", "18/20", "18/20"],
    ["Fabien Petit", "11/20", "10/20", "12/20", "13/20", "14/20", "10/20", "8/20", "11/20", "12/20", "15/20"],
    ["Gabrielle Lefevre", "19/20", "18/20", "17/20", "18/20", "20/20", "17/20", "16/20", "17/20", "19/20", "19/20"],
    ["Hugo Garcia", "10/20", "11/20", "9/20", "12/20", "13/20", "9/20", "7/20", "10/20", "11/20", "14/20"],
    ["Isabelle Moreau", "14/20", "15/20", "13/20", "15/20", "16/20", "13/20", "12/20", "14/20", "16/20", "17/20"],
    ["Jean Dupuis", "16/20", "14/20", "15/20", "16/20", "18/20", "15/20", "13/20", "14/20", "15/20", "18/20"]
];

/** Slide presenting the Table component. */
function Tables({ text }) {
    return (
        <CenterLayout>
            <Heading align="center" fontSize="8xl">{text.title}</Heading>
            <br /><br />
            <Table fontSize="xl" divider="gray-400" content={[
                ["", ...text.subjects.map((subject) => <Heading key={subject} level={2} fontSize="2xl">{subject}</Heading>)],
                ...MARKS.map(([name, ...marks]) => [<Heading key={name} level={2} fontSize="2xl">{name}</Heading>, ...marks])
            ]} />
        </CenterLayout>
    );
}

export default Tables;
