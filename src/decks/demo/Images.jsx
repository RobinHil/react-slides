import { CenterLayout, Heading, TwoColumnLayout, Paragraph, Image } from '../../components/index.jsx';
import logo from '../../assets/logo.svg';

/** One example of an image, under its title and its explanation. */
function ImageExample({ title, explanation, children }) {
    return (
        <CenterLayout>
            <Heading level={2} fontSize="5xl" align="center">{title}</Heading>
            <br />
            <Paragraph align="justify">{explanation}</Paragraph>
            <br />
            {children}
        </CenterLayout>
    );
}

/** Slide presenting images, their sizes and captions. */
function Images({ text }) {
    const [simple, simpleText] = text.simple;
    const [captioned, captionedText, captionedCaption] = text.captioned;
    const [size, sizeText, sizeCaption] = text.size;
    const [caption, captionText, captionCaption] = text.caption;

    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">{text.title}</Heading>
            <br /><br />
            <br /><br />
            <br /><br />
            <TwoColumnLayout
                leftContent={<TwoColumnLayout
                    leftContent={<ImageExample title={simple} explanation={simpleText}>
                        <Image src={logo} alt={text.alt} align="center" />
                    </ImageExample>}

                    rightContent={<ImageExample title={captioned} explanation={captionedText}>
                        <Image src={logo} alt={text.alt} align="center">{captionedCaption}</Image>
                    </ImageExample>}
                />}

                rightContent={<TwoColumnLayout
                    leftContent={<ImageExample title={size} explanation={sizeText}>
                        <Image src={logo} alt={text.alt} align="center" width="1/2">{sizeCaption}</Image>
                    </ImageExample>}

                    rightContent={<ImageExample title={caption} explanation={captionText}>
                        <Image src={logo} alt={text.alt} align="center">
                            <Heading level={3} fontSize="3xl" align="center">{captionCaption}</Heading>
                        </Image>
                    </ImageExample>}
                />}
            />
        </CenterLayout>
    );
}

export default Images;
