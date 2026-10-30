import { backgroundStyle, cssColor } from './styles.js';
import Text from './Text.jsx';

/** Table built from an array of rows, with colored dividers between them. */
function Table({ content, fontSize="2xl", color, bg="transparent", align="center", divider="gray-200", ...props }) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-(--divider)" style={{ textAlign: align, "--divider": cssColor(divider), ...backgroundStyle(bg) }}>
                {content.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <Text key={cellIndex} as="td" className="px-6 py-4" fontSize={fontSize} color={color} {...props}>
                                {cell}
                            </Text>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
