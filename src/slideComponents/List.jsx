import { textSize, textColor, bgColor, listType, textAlign } from './theme.js';

function List({ list=[], type="bulleted", fontSize=6, align="left", color="black", bg="transparent" }) {
    const combinedStyle = `list-inside ${listType[type]} ${textSize[fontSize]} ${textColor[color]} ${bgColor[bg]} ${textAlign[align]}`;

    return (
        <ul className={combinedStyle}>
            {list.map((entry, index) => (
                <li key={index}>{entry}</li>
            ))}
        </ul>
    );
}

export default List;