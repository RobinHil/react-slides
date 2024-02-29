import { textSize, textAlign, textColor, bgColor, listType } from './theme.js';

function List({ list=[], type="bulleted", fontSize=2, align="left", color="black", bg="transparent"}) {
    const combinedStyle = `list-inside ${listType[type]} ${textSize[fontSize]} ${textColor[color]} ${bgColor[bg]} ${textAlign[align]}`;

    return (
        <ul className={combinedStyle}>
            {list.map(entry => (
                <li key={entry}>{entry}</li>
            ))}
        </ul>
    );
}

export default List;