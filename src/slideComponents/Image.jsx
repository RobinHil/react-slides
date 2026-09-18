import { flexAlign, bgColor, textSize, textColor, imgWidth } from './theme.js';
import resolveSrc from './resolveSrc.js';

function Image({ children, src="", alt="", align="center", fontSize=2, fontColor="black", bg="transparent", width="auto" }) {
    const combinedStyle = `flex flex-col items-center ${flexAlign[align]} ${bgColor[bg]} ${textSize[fontSize]} ${textColor[fontColor]}`;
    const resolved = resolveSrc(src);

    return (
        <div className={combinedStyle}>
            {children?(
                <figure className="flex flex-col items-center">
                    <img src={resolved} alt={alt} className={`h-auto ${imgWidth[width]}`} />
                    <figcaption className="italic text-center text-xl">
                        {children}
                    </figcaption>
                </figure>
            ):(
                <img src={resolved} alt={alt} className={`h-auto ${imgWidth[width]}`} />
            )}
        </div>
    );
}

export default Image;