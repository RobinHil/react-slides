import { bgColor, headingSize, textAlign, textColor } from './theme.js';

function Heading({ children, fontSize=6, align="left", color="black", bg="transparent", italic=false, underline=false, crossed=false }) {
    const combinedStyle = `font-bold ${italic===true?"italic":""} ${crossed===true?"line-through":""} ${underline===true?"underline":""} ${headingSize[fontSize]} ${textAlign[align]} ${textColor[color]} ${bgColor[bg]}`;

    return (
        <h1 className={combinedStyle}>{children}</h1>
    );
}

export default Heading;
