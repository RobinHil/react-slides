import { textSize, textColor, bgColor, textAlign, dividerColor } from './theme.js';

function Table({ content, fontSize=6, fontColor="black", bg="transparent", align="center", divider="lightGray" }) {
    const combinedStyle = `divide-y divide-gray-200 ${textSize[fontSize]} ${textColor[fontColor]} ${bgColor[bg]} ${textAlign[align]} ${dividerColor[divider]}`;
    
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <tbody className={combinedStyle}>
                {content.map((row) => (
                    <tr key={Math.random()}>
                        {row.map((cell) => (
                            <td key={Math.random()} className="px-6 py-4">
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