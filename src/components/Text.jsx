import { Children } from 'react';
import { isGradient, gradientColorAt, textStyle, textGradientStyle, backgroundStyle, fontSizeStyle, fontStyle } from './styles.js';
import { usePrinted } from '../contexts/Print.context.jsx';

/** Style that underlines or strikes through a text. */
function textDecoration(underline, strike) {
    const lines = [underline && "underline", strike && "line-through"].filter(Boolean);
    return lines.length ? { textDecorationLine: lines.join(" ") } : {};
}

/** Plain text of children made only of strings and numbers, or null when they hold elements. */
function plainText(children) {
    const parts = Children.toArray(children);
    return parts.every((part) => typeof part==="string" || typeof part==="number") ? parts.join("") : null;
}

/** Gradient text drawn one letter at a time in its own color, which every PDF reader prints faithfully. */
function GradientLetters({ text, paint }) {
    const letters = Array.from(text);
    const last = Math.max(letters.length-1, 1);

    return letters.map((letter, index) => /\s/.test(letter) ? letter : (
        <span key={index} style={{ color: gradientColorAt(paint, index/last) }}>{letter}</span>
    ));
}

/** Base of every text component, rendering any tag with the shared size, color, font and style props. */
function Text({ children, as: Tag="span", fontSize, align, color, bg, bold=false, italic=false, underline=false, strike=false, font, className="", ...props }) {
    const combinedStyle = [className, bold && "font-bold", italic && "italic"].filter(Boolean).join(" ");
    const isPrinted = usePrinted();
    const text = isGradient(color) && isPrinted ? plainText(children) : null;

    return (
        <Tag {...props} className={combinedStyle || undefined} style={{ textAlign: align, ...fontSizeStyle(fontSize), ...textStyle(color), ...backgroundStyle(bg), ...fontStyle(font), ...textDecoration(underline, strike) }}>
            {text!==null ? <GradientLetters text={text} paint={color} /> : isGradient(color) ? <span style={textGradientStyle(color)}>{children}</span> : children}
        </Tag>
    );
}

export default Text;
