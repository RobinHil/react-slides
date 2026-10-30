import { Presentation, Slide } from '../../interface/index.jsx';
import { Image, Paragraph, RowLayout } from '../../components/index.jsx';
import pageNumber from '../../components/pageNumber.js';
import themes from '../../components/themes.js';
import logo from '../../assets/logo.svg';
import Title from './Title.jsx';
import Summary from './Summary.jsx';
import TextTypes from './TextTypes.jsx';
import TextFormatting from './TextFormatting.jsx';
import Links from './Links.jsx';
import Colors from './Colors.jsx';
import Backgrounds from './Backgrounds.jsx';
import Palette from './Palette.jsx';
import Fonts from './Fonts.jsx';
import Themes from './Themes.jsx';
import HeadersFooters from './HeadersFooters.jsx';
import Images from './Images.jsx';
import Lists from './Lists.jsx';
import Tables from './Tables.jsx';
import CodeHighlighting from './CodeHighlighting.jsx';
import MarkdownContent from './MarkdownContent.jsx';
import Diagrams from './Diagrams.jsx';
import Formulas from './Formulas.jsx';
import Videos from './Videos.jsx';
import Steps from './Steps.jsx';
import Conclusion from './Conclusion.jsx';

/** Corners of the headers and footers slide, in the language of its texts. */
function headersFootersCorners(text) {
    return {
        topLeft: (
            <RowLayout gap={3} align="left">
                <Image src={logo} alt="" width="auto" maxHeight="1/30" />
                <Paragraph fontSize="2xl" color="gray-500">React Slides</Paragraph>
            </RowLayout>
        ),
        topRight: { text: text.chapter, color: "sky-600" },
        bottomLeft: { text: "Robin HILAIRE", font: "caveat", fontSize: "4xl", color: "slate-600" },
        bottomRight: ({ number, total }) => ({ text: text.slideOf(number, total), color: ["sky-500", "violet-600"] })
    };
}

/** Demo deck of the library, one slide per component, written in the language of the given texts. */
function DemoDeck({ text, lang }) {
    return (
        <Presentation lang={lang} corners={{ topLeft: "React Slides", bottomRight: pageNumber }}>
            <Slide corners={false} notes={text.notes.title}><Title text={text.title} /></Slide>
            <Slide notes={text.notes.summary}><Summary text={text.summary} /></Slide>
            <Slide><TextTypes text={text.textTypes} /></Slide>
            <Slide><TextFormatting text={text.textFormatting} /></Slide>
            <Slide><Links text={text.links} /></Slide>
            <Slide><Colors text={text.colors} /></Slide>
            <Slide background="gray-800"><Backgrounds text={text.backgrounds} /></Slide>
            <Slide background="slate-50"><Palette text={text.palette} /></Slide>
            <Slide background={["slate-50", "indigo-50"]}><Fonts text={text.fonts} /></Slide>
            <Slide theme={themes.night}><Themes text={text.themes} /></Slide>
            <Slide background={["white", "sky-50"]} corners={headersFootersCorners(text.corners)}><HeadersFooters text={text.headersFooters} /></Slide>
            <Slide><Images text={text.images} /></Slide>
            <Slide notes={text.notes.lists}><Lists text={text.lists} /></Slide>
            <Slide><Tables text={text.tables} /></Slide>
            <Slide><CodeHighlighting text={text.code} /></Slide>
            <Slide><MarkdownContent text={text.markdown} /></Slide>
            <Slide><Diagrams text={text.diagrams} /></Slide>
            <Slide notes={text.notes.formulas}><Formulas text={text.formulas} /></Slide>
            <Slide><Videos text={text.videos} /></Slide>
            <Slide notes={text.notes.steps}><Steps text={text.steps} /></Slide>
            <Slide><Conclusion text={text.conclusion} /></Slide>
        </Presentation>
    );
}

export default DemoDeck;
