import Text from './Text.jsx';

/** Bold title text, with larger sizes than the other texts, at a heading level from 1 to 6 for screen readers. */
function Heading({ level=1, fontSize="6xl", align="left", color, bg="transparent", bold=true, font="var(--heading-font, inherit)", ...props }) {
    return (
        <Text as={`h${level}`} fontSize={fontSize} align={align} color={color} bg={bg} bold={bold} font={font} {...props} />
    );
}

export default Heading;
