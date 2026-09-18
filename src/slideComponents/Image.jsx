import { flexAlign, bgColor, textSize, textColor, imgWidth } from './theme.js';

// Les diapositives designent leurs images par un chemin absolu ("/chat.jpg"),
// commode a ecrire mais faux des que le site n'est pas servi a la racine du
// domaine - le cas sur GitHub Pages, ou il vit sous /react-slides/. On resout
// donc le chemin contre la base du build, qui vaut "/" en developpement.
function resolveSrc(src) {
    if (!src || /^([a-z]+:)?\/\//.test(src) || src.startsWith('data:')) return src;
    return `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;
}

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