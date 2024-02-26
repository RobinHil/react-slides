import classNames from "classnames";
import { textSize, textAlign, textColor, bgColor } from "./theme.js";

function Paragraph({ children, fontSize=3, align="left", color="black", bg="transparent"}) {
    const combinedStyle = classNames(textSize[fontSize], textAlign[align], textColor[color], bgColor[bg]);

    return (
        <p className={combinedStyle}>{children}</p>
    );
}

export default Paragraph;