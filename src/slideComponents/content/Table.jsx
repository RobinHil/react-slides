import classNames from "classnames";
import { textSize, textColor, bgColor, textAlign, dividerColor } from "./theme.js";

function Table({ content, fontSize=3, fontColor="black", bg="transparent", align="center", divider="lightGray" }) {
    const combinedStyle = classNames("divide-y divide-gray-200", textSize[fontSize], textColor[fontColor], bgColor[bg], textAlign[align], dividerColor[divider]);
    
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <tbody className={combinedStyle}>
                {content.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-6 py-4">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;