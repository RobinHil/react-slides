import Text from './Text.jsx';
import { isExternal } from './links.js';

/** Hyperlink text, opening other sites in a new tab. */
function Link({ fontSize="2xl", align="left", color="blue-500", bg="transparent", href="", ...props }) {
    const target = isExternal(href) ? { target: "_blank", rel: "noreferrer" } : {};

    return (
        <Text as="a" href={href} {...target} className="hover:underline" fontSize={fontSize} align={align} color={color} bg={bg} {...props} />
    );
}

export default Link;
