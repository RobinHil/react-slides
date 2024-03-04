import { textSize, textAlign, textColor, bgColor } from './theme.js';

function Link({ children, fontSize=6, align="left", color="blue", bg="transparent", href="" }) {
    const combinedStyle = `hover:underline ${textSize[fontSize]} ${textAlign[align]} ${textColor[color]} ${bgColor[bg]}`;

    return (
        <a href={href} className={combinedStyle}>{children}</a>
    );
}

export default Link;