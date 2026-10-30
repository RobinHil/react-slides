/** Reads the slide and the step written in the address, like #7 or #7.2, or null when there are none. */
function readHash() {
    const [slide, step] = window.location.hash.slice(1).split(".").map((part) => parseInt(part));
    return Number.isNaN(slide) ? null : { slide, step: Number.isInteger(step) ? step : 0 };
}

/** Writes a position in the address, the step bounded by the steps of the slide and left out at its start. */
function writeHash(slide, step, count) {
    const shown = Math.min(step, count);
    history.replaceState(null, "", shown>0 ? `#${slide}.${shown}` : `#${slide}`);
}

/** Keeps a slide number between the first and the last slide. */
function clamp(slide, total) {
    return Math.min(Math.max(slide, 1), total);
}

export { readHash, writeHash, clamp };
