import { CenterLayout, Heading, List } from '../../components/index.jsx';

/** Slide listing the parts of the presentation. */
function Summary({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center" color="blue-500">{text.title}</Heading>
            <br />
            <br />
            <br />
            <br />
            <List type="numbered" align="center" fontSize="3xl" list={text.parts} />
        </CenterLayout>
    );
}

export default Summary;
