import { flexAlign, bgColor, textSize, textColor } from './theme.js';

function Image({ children, src = "", alt = "", align = "left", fontSize = 2, fontColor = "black", bg = "transparent" }) {
    const combinedStyle = `flex flex-col ${flexAlign[align]} ${bgColor[bg]} ${textSize[fontSize]} ${textColor[fontColor]}`;

    return (
        <div className={combinedStyle}>
            {children?(
                <figure>
                    <img src={src} alt={alt} />
                    <figcaption className="italic text-center">
                        {children}
                    </figcaption>
                </figure>
            ):(
                <img src={src} alt={alt} />
            )}
        </div>
    );
}

export default Image;