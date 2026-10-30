/** Tells whether an address leads to another site, which opens in a new tab rather than leaving the presentation. */
function isExternal(href) {
    try {
        const url = new URL(href, location.href);
        return /^https?:$/.test(url.protocol) && url.origin!==location.origin;
    } catch {
        return false;
    }
}

export { isExternal };
