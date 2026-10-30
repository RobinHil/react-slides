import { listType, backgroundStyle, fontSizeStyle, flexPosition } from './styles.js';
import Text from './Text.jsx';

/** Bulleted or numbered list, whose markers stay aligned whatever the alignment. */
function List({ list=[], type="bulleted", fontSize="2xl", align="left", color, bg="transparent", ...props }) {
    return (
        <div className="flex flex-col" style={{ alignItems: flexPosition(align), ...backgroundStyle(bg) }}>
            <ul className={`list-outside ${listType[type]}`} style={{ textAlign: align==="justify" ? "justify" : "left", ...fontSizeStyle(fontSize) }}>
                {list.map((entry, index) => (
                    <Text key={index} as="li" fontSize={fontSize} color={color} {...props}>{entry}</Text>
                ))}
            </ul>
        </div>
    );
}

export default List;
