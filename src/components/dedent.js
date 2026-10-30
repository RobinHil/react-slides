/** Removes the blank edges and the indentation shared by every line of a text. */
function dedent(text) {
    const lines = text.replace(/^\s*\n|\s+$/g, "").split("\n");
    const indent = Math.min(...lines.filter((line) => line.trim()).map((line) => line.match(/^\s*/)[0].length));
    return lines.map((line) => line.slice(indent)).join("\n");
}

export default dedent;
