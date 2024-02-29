import Layout from "../slideComponents/Layout.jsx";
import Heading from "../slideComponents/Heading.jsx";

function Slide4() {
    return (
        <Layout align="bottom">
            <Heading color="red" crossed={true}>
                Diapo de titreeeee
            </Heading>
            <Heading color="blue" fontSize={4} align="center" italic={true} underline={true}>
                Sous-titreeeee
            </Heading>
        </Layout>
    );
}

export default Slide4;