import Text from './Text.jsx';

/** Paragraph of body text. */
function Paragraph({ fontSize="2xl", align="left", color, bg="transparent", ...props }) {
    return (
        <Text as="p" fontSize={fontSize} align={align} color={color} bg={bg} {...props} />
    );
}

export default Paragraph;
