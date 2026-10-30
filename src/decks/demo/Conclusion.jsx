import { CenterLayout, Markdown } from '../../components/index.jsx';
import logo from '../../assets/logo.svg';

/** Closing slide of the presentation. */
function Conclusion({ text }) {
    return (
        <CenterLayout>
            <Markdown>{`## ${text.title}

<br/>

![${text.alt}](${logo})

<br/>

*${text.caption}*`
            }</Markdown>
        </CenterLayout>
    );
}

export default Conclusion;
