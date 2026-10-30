import { backgroundStyle } from './styles.js';
import Paragraph from './Paragraph.jsx';

const swatchSize = {
    fill: "w-full h-8 rounded-md",
    md: "w-24 h-24 rounded-2xl shadow-lg",
    lg: "w-80 h-28 rounded-2xl shadow-lg"
};

/** Sample of a color or gradient, with an optional label under it. */
function ColorSwatch({ color="white", label, size="md", fontSize="lg", labelColor="slate-600", font }) {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className={`ring-1 ring-black/10 ${swatchSize[size]}`} style={backgroundStyle(color)} />
            {label!=null && (
                <div className="max-w-80">
                    <Paragraph fontSize={fontSize} align="center" color={labelColor} font={font}>{label}</Paragraph>
                </div>
            )}
        </div>
    );
}

export default ColorSwatch;
