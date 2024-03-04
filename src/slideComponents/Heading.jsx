import { bgColor, headingSize, textAlign, textColor } from './theme.js';

function Heading({ children, fontSize=6, align="left", color="black", bg="transparent" }) {
    const combinedStyle = `font-bold ${headingSize[fontSize]} ${textAlign[align]} ${textColor[color]} ${bgColor[bg]}`;

    return (
        <h1 className={combinedStyle}>{children}</h1>
    );
}

export default Heading;
