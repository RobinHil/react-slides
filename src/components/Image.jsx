import { backgroundStyle, flexPosition, fraction } from './styles.js';
import Text from './Text.jsx';

/** Image, either filling the room left on the slide or at a set width, with an optional caption. */
function Image({ children, src="", alt="", align="center", fontSize="xl", color, bg="transparent", width="fill", maxHeight, italic=true, ...props }) {
    const isFill = width==="fill";
    const fillHeight = "var(--fill-height, 100000px)";

    const image = isFill ? (
        <img
            src={src}
            alt={alt}
            data-fill=""
            className="h-auto max-w-full object-contain"
            style={{ objectPosition: align, width: "var(--frame-width)", maxHeight: maxHeight ? `min(${fillHeight}, ${fraction(maxHeight, "var(--frame-height)")})` : fillHeight }}
        />
    ) : (
        <img
            src={src}
            alt={alt}
            className="h-auto max-w-full object-contain"
            style={{ objectPosition: align, width: width==="auto" ? "auto" : `calc(${fraction(width, "100%")})`, maxHeight: maxHeight && `calc(${fraction(maxHeight, "var(--frame-height)")})` }}
        />
    );

    return (
        <div className="flex flex-col" style={{ alignItems: flexPosition(align), ...backgroundStyle(bg) }}>
            {children?(
                <figure className="flex flex-col w-full" style={{ alignItems: flexPosition(align) }}>
                    {image}
                    <Text as="figcaption" align="center" fontSize={fontSize} color={color} italic={italic} {...props}>
                        {children}
                    </Text>
                </figure>
            ):(
                image
            )}
        </div>
    );
}

export default Image;
