const GRADIENT_ANGLE = 135;

const EDGES = {
    left: "flex-start",
    top: "flex-start",
    right: "flex-end",
    bottom: "flex-end"
};

const listType = {
    numbered: "list-decimal pl-[1.75em]",
    bulleted: "list-disc pl-[1.1em]"
};

/** Turns a name of the Tailwind theme into its variable, falling back to the name itself, and keeps any other CSS value. */
function themeValue(namespace, name) {
    return /^[\w-]+$/.test(name) ? `var(--${namespace}-${name}, ${name})` : name;
}

/** Turns a color of the palette such as "sky-500", or any CSS color, into a CSS value. */
function cssColor(color) {
    return themeValue("color", color);
}

/** Tells whether a paint is a gradient rather than a single color. */
function isGradient(paint) {
    return typeof paint==="object" && paint!==null;
}

/** Builds the CSS linear gradient of a list of colors, with an optional angle. */
function gradient(paint) {
    const { colors, angle=GRADIENT_ANGLE } = Array.isArray(paint) ? { colors: paint } : paint;
    return `linear-gradient(${angle}deg, ${colors.map(cssColor).join(", ")})`;
}

/** Style painting a background with a color or a gradient. */
function backgroundStyle(paint) {
    if (paint===undefined)
        return {};
    return { background: isGradient(paint) ? gradient(paint) : cssColor(paint) };
}

/** Style coloring a text with a single color. */
function textStyle(paint) {
    if (paint===undefined || isGradient(paint))
        return {};
    return { color: cssColor(paint) };
}

/** Color of a gradient at a fraction of its width read from left to right, mixed in oklab like CSS gradients. */
function gradientColorAt(paint, fraction) {
    const { colors, angle=GRADIENT_ANGLE } = Array.isArray(paint) ? { colors: paint } : paint;
    const position = (Math.sin(angle*Math.PI/180)<0 ? 1-fraction : fraction)*(colors.length-1);
    const index = Math.min(Math.floor(position), colors.length-2);
    return `color-mix(in oklab, ${cssColor(colors[index])}, ${cssColor(colors[index+1])} ${(position-index)*100}%)`;
}

/** Style painting a text with a gradient. */
function textGradientStyle(paint) {
    return {
        backgroundImage: gradient(paint),
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone"
    };
}

/** Style setting a Tailwind text size such as "4xl" with its line height, or any CSS size. */
function fontSizeStyle(size) {
    if (!size)
        return {};
    if (!/^[\w-]+$/.test(size))
        return { fontSize: size };
    return { fontSize: `var(--text-${size}, ${size})`, lineHeight: `var(--text-${size}--line-height, normal)` };
}

/** Style setting a font of the theme such as "lora", or any CSS font family. */
function fontStyle(font) {
    if (!font)
        return {};
    return { fontFamily: themeValue("font", font) };
}

/** Turns a fraction such as "1/3" into a CSS product of the given length. */
function fraction(value, length) {
    const [numerator, denominator] = value.split("/");
    return `${length} * ${numerator} / ${denominator}`;
}

/** Turns left, right, top or bottom into the start or end of a flex axis, and keeps center. */
function flexPosition(position) {
    return EDGES[position] ?? position;
}

export { listType, cssColor, isGradient, gradientColorAt, backgroundStyle, textStyle, textGradientStyle, fontSizeStyle, fontStyle, fraction, flexPosition };
