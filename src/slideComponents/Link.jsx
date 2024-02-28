import classNames from "classnames";
import { textSize, textAlign, textColor, bgColor } from "./theme.js";

function Link({ children, fontSize=3, align="left", color="blue", bg="transparent", href="" }) {
    const combinedStyle = classNames("hover:underline", textSize[fontSize], textAlign[align], textColor[color], bgColor[bg]);

    return (
        <a href={href} className={combinedStyle}>{children}</a>
    );
}

export default Link;