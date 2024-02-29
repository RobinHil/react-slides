import CenterLayout from "../slideComponents/CenterLayout.jsx";
import Heading from "../slideComponents/Heading.jsx";

function Slide4() {
    return (
        <CenterLayout>
            <Heading color="red" crossed={true}>
                Diapo de titreeeee
            </Heading>
            <Heading color="blue" fontSize={4} align="center" italic={true} underline={true}>
                Sous-titreeeee
            </Heading>
        </CenterLayout>
    );
}

export default Slide4;