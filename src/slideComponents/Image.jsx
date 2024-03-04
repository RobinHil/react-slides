import { flexAlign, bgColor, textSize, textColor, imgWidth } from './theme.js';

function Image({ children, src="", alt="", align="center", fontSize=2, fontColor="black", bg="transparent", width="auto" }) {
    const combinedStyle = `flex flex-col items-center ${flexAlign[align]} ${bgColor[bg]} ${textSize[fontSize]} ${textColor[fontColor]}`;

    return (
        <div className={combinedStyle}>
            {children?(
                <figure className="flex flex-col items-center">
                    <img src={src} alt={alt} className={`h-auto ${imgWidth[width]}`} />
                    <figcaption className="italic text-center text-xl">
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