import { textSize, textAlign, textColor, bgColor } from './theme.js';

function Paragraph({ children, fontSize=6, align="left", color="black", bg="transparent", italic=false, underline=false, crossed=false }) {
    const combinedStyle = `${italic===true?"italic":""} ${crossed===true?"line-through":""} ${underline===true?"underline":""} ${textSize[fontSize]} ${textAlign[align]} ${textColor[color]} ${bgColor[bg]}`;

    return (
        <p className={combinedStyle}>{children}</p>
    );
}

export default Paragraph;