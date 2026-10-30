const YOUTUBE = /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
const VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/;

/** Reads a YouTube or Vimeo address into the address of its player, of its page and of its still image, or null for a video file. */
function embedOf(src, { autoPlay, loop, muted }) {
    const youtube = YOUTUBE.exec(src)?.[1];
    if (youtube) {
        const params = new URLSearchParams({ rel: "0", ...(autoPlay && { autoplay: "1" }), ...(muted && { mute: "1" }), ...(loop && { loop: "1", playlist: youtube }) });
        return { player: `https://www.youtube-nocookie.com/embed/${youtube}?${params}`, link: `https://www.youtube.com/watch?v=${youtube}`, still: `https://i.ytimg.com/vi/${youtube}/hqdefault.jpg` };
    }
    const vimeo = VIMEO.exec(src)?.[1];
    if (vimeo) {
        const params = new URLSearchParams({ dnt: "1", ...(autoPlay && { autoplay: "1" }), ...(muted && { muted: "1" }), ...(loop && { loop: "1" }) });
        return { player: `https://player.vimeo.com/video/${vimeo}?${params}`, link: `https://vimeo.com/${vimeo}`, still: null };
    }
    return null;
}

export { embedOf };
