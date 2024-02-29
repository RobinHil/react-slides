import { flexAlign, bgColor, textSize, textColor, imgWidth } from './theme.js';

function Image({ children, src="", alt="", align="left", fontSize=2, fontColor="black", bg="transparent", width="auto" }) {
    const combinedStyle = `flex flex-col ${flexAlign[align]} ${bgColor[bg]} ${textSize[fontSize]} ${textColor[fontColor]}`;

    return (
        <div className={combinedStyle}>
            {children?(
                <figure>
                    <img src={src} alt={alt} className={`h-auto ${imgWidth[width]}`} />
                    <figcaption className="italic text-center">
                        {children}
                    </figcaption>
                </figure>
            ):(
                <img src={src} alt={alt} className={`h-auto ${imgWidth[width]}`} />
            )}
        </div>
    );
}

export default Image;