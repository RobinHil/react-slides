import { CenterLayout, Heading, TwoColumnLayout, Paragraph } from '../../components/index.jsx';

/** Slide presenting the text and background colors. */
function Colors({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">{text.title}</Heading>
            <br />
            <br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Heading level={2} align="center">{text.text}</Heading>
                    <br />
                    <Paragraph fontSize="2xl" align="justify">{text.textIntro}</Paragraph>
                    <br />
                    <Paragraph fontSize="2xl" align="center" color="black">black</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="white" bg="gray-400">white</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="gray-600">gray-600</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="gray-400">gray-400</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="gray-800">gray-800</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="red-700">red-700</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="orange-600">orange-600</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="yellow-500">yellow-500</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="lime-700">lime-700</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="green-600">green-600</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="cyan-500">cyan-500</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="sky-500">sky-500</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="blue-500">blue-500</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="violet-700">violet-700</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="pink-600">pink-600</Paragraph>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Heading level={2} align="center">{text.background}</Heading>
                    <br />
                    <Paragraph fontSize="2xl" align="justify">{text.backgroundIntro}</Paragraph>
                    <br />
                    <Paragraph fontSize="2xl" align="center" color="white" bg="black">black</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="white">white</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="white" bg="gray-600">gray-600</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="gray-400">gray-400</Paragraph>
                    <Paragraph fontSize="2xl" align="center" color="white" bg="gray-800">gray-800</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="red-500">red-500</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="orange-400">orange-400</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="yellow-300">yellow-300</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="lime-300">lime-300</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="green-400">green-400</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="cyan-300">cyan-300</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="sky-300">sky-300</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="blue-300">blue-300</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="violet-400">violet-400</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="pink-400">pink-400</Paragraph>
                    <Paragraph fontSize="2xl" align="center" bg="transparent">transparent</Paragraph>
                </CenterLayout>}
            />
            <br />
            <Paragraph fontSize="2xl" align="center">
                <i>{text.footnote}</i>
            </Paragraph>
        </CenterLayout>
    );
}

export default Colors;
