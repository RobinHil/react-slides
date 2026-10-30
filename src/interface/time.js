/** Writes a duration as minutes and seconds, with the hours once there are some. */
function formatDuration(milliseconds) {
    const seconds = Math.floor(milliseconds/1000);
    const parts = [Math.floor(seconds/3600), Math.floor(seconds/60)%60, seconds%60].map((part) => String(part).padStart(2, "0"));
    return seconds>=3600 ? parts.join(":") : parts.slice(1).join(":");
}

export { formatDuration };
