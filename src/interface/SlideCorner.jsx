import { isValidElement } from 'react';
import Text from '../components/Text.jsx';

const DEFAULT_CORNER = { fontSize: "2xl", color: "gray-500" };

/** Header or footer text of a slide corner, given as a text, an object, a function or an element. */
function SlideCorner({ value, number, total, align="left" }) {
    const content = typeof value==="function" ? value({ number, total }) : value;
    const alignment = align==="left" ? "text-left" : "text-right";

    if (content==null)
        return <span />;

    if (isValidElement(content))
        return <div className={`min-w-0 ${alignment}`}>{content}</div>;

    const { text, font, color, fontSize } = { ...DEFAULT_CORNER, ...(typeof content==="object" ? content : { text: content }) };

    return (
        <Text className="min-w-0 truncate" fontSize={fontSize} align={align} color={color} font={font}>{text}</Text>
    );
}

export default SlideCorner;
