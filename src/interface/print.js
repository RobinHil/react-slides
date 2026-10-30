const SHADOW_LAYERS = 5;

/** Splits a computed box shadow into its layers, leaving the commas inside colors. */
function shadowLayers(value) {
    return value.split(/,(?![^(]*\))/).map((layer) => layer.trim());
}

/** Redraws a blurred shadow layer as sharp layers of growing spread, which every PDF reader draws the same, keeping inner shadows as they are. */
function sharpen(layer) {
    const match = /^(.+\))\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px\s+(-?[\d.]+)px$/.exec(layer);
    if (!match || Number(match[4])===0 || /\binset\b/.test(layer))
        return [layer];
    const [, color, x, y, blur, spread] = match;
    return Array.from({ length: SHADOW_LAYERS }, (_, index) => {
        const grown = Number(spread)+Number(blur)*(index/(SHADOW_LAYERS-1)-0.5);
        return `color-mix(in srgb, ${color} ${100/SHADOW_LAYERS}%, transparent) ${x}px ${y}px 0px ${grown}px`;
    });
}

export { SHADOW_LAYERS, shadowLayers, sharpen };
