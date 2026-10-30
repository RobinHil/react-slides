import { CenterLayout, Heading, Paragraph, TwoColumnLayout, Video } from '../../components/index.jsx';
import clip from '../../assets/demo.mp4';

/** Slide presenting videos, from the assets or from YouTube. */
function Videos({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">{text.title}</Heading>
            <br /><br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Heading level={2} fontSize="5xl" align="center">{text.file[0]}</Heading>
                    <br />
                    <Paragraph align="justify">{text.file[1]}</Paragraph>
                    <br />
                    <Video src={clip} alt={text.file[3]} autoPlay loop maxHeight="1/2">{text.file[2]}</Video>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Heading level={2} fontSize="5xl" align="center">{text.embed[0]}</Heading>
                    <br />
                    <Paragraph align="justify">{text.embed[1]}</Paragraph>
                    <br />
                    <Video src="https://www.youtube.com/watch?v=aqz-KE-bpKQ" alt="Big Buck Bunny" maxHeight="1/2">{text.embed[2]}</Video>
                </CenterLayout>}
            />
        </CenterLayout>
    );
}

export default Videos;
