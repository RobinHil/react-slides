import { use } from 'react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { flexPosition, fraction } from './styles.js';
import { embedOf } from './embeds.js';
import Text from './Text.jsx';
import Icon from '../interface/Icon.jsx';
import { useLiveSlide } from '../contexts/LiveSlide.context.jsx';
import { usePrinted } from '../contexts/Print.context.jsx';

const WIDE = 16/9;
const FILL_HEIGHT = "var(--fill-height, 100000px)";
const frames = new Map();
const ratios = new Map();

/** Waits for an event of a media element, or fails when it cannot be loaded, listening to neither afterwards. */
function once(video, event) {
    return new Promise((resolve, reject) => {
        const listening = new AbortController();
        video.addEventListener(event, () => {
            listening.abort();
            resolve();
        }, { signal: listening.signal });
        video.addEventListener("error", () => {
            listening.abort();
            reject(new Error(`The video ${video.src} could not be loaded`));
        }, { signal: listening.signal });
    });
}

/** Reads the proportions of a video file from its first bytes only. */
async function probe(src) {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = src;
    await once(video, "loadedmetadata");
    const ratio = video.videoWidth/video.videoHeight;
    video.removeAttribute("src");
    video.load();
    return ratio;
}

/** Reads the proportions of a video file once, and gives back the same promise to every later render. */
function videoRatio(src) {
    if (!ratios.has(src))
        ratios.set(src, probe(src));
    return ratios.get(src);
}

/** Captures the first frame of a video file as an image, with the proportions of the video. */
async function capture(src) {
    const video = document.createElement("video");
    video.muted = true;
    video.preload = "auto";
    video.src = src;
    await once(video, "loadeddata");
    video.currentTime = Math.min(0.1, video.duration/2);
    await once(video, "seeked");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    video.removeAttribute("src");
    video.load();
    return { image: canvas.toDataURL("image/jpeg", 0.9), ratio: canvas.width/canvas.height };
}

/** Captures the first frame of a video file once, and gives back the same promise to every later render. */
function firstFrame(src) {
    if (!frames.has(src))
        frames.set(src, capture(src));
    return frames.get(src);
}

/** Style giving a video the proportions of its picture, either filling the room left on the slide or at a set width, capped to a height. */
function boxStyle(width, maxHeight, ratio) {
    const isFill = width==="fill";
    const cap = maxHeight && fraction(maxHeight, "var(--frame-height)");
    const height = isFill ? (cap ? `min(${FILL_HEIGHT}, ${cap})` : FILL_HEIGHT) : cap;
    const room = isFill ? "var(--frame-width)" : fraction(width, "100%");
    return { width: height ? `min(${room}, ${height} * ${ratio})` : `calc(${room})`, aspectRatio: ratio };
}

/** Picture standing for a video outside of the presentation, with a play sign, linking to the video in a PDF. */
function Still({ image, link, ratio, width, maxHeight, alt }) {
    const isPrinted = usePrinted();
    const Tag = isPrinted ? "a" : "div";

    return (
        <Tag href={isPrinted ? link : undefined} data-fill={width==="fill" ? "" : undefined} className="relative block overflow-hidden bg-gray-900" style={boxStyle(width, maxHeight, ratio)}>
            {image && <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />}
            <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex w-[12%] aspect-square items-center justify-center rounded-full bg-black/60 text-white">
                    <Icon icon={faPlay} className="h-[40%] translate-x-[8%]" />
                </span>
            </span>
        </Tag>
    );
}

/** Video file of the assets played in the presentation, laid out at its proportions as soon as they are read. */
function LiveVideoFile({ src, poster, autoPlay, loop, muted, controls, width, maxHeight, alt }) {
    const ratio = use(videoRatio(src));

    return (
        <video
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            controls={controls}
            playsInline
            preload="metadata"
            aria-label={alt || undefined}
            data-fill={width==="fill" ? "" : undefined}
            className="bg-black object-contain"
            style={boxStyle(width, maxHeight, ratio)}
        />
    );
}

/** Video file of the assets shown by its poster or first frame, outside of the presentation. */
function StillVideoFile({ src, poster, width, maxHeight, alt }) {
    const frame = use(firstFrame(src));

    return <Still image={poster ?? frame.image} link={new URL(src, location.href).href} ratio={frame.ratio} width={width} maxHeight={maxHeight} alt={alt} />;
}

/** Video file of the assets, played in the presentation, and shown by its poster or first frame elsewhere. */
function VideoFile(props) {
    const isLive = useLiveSlide();
    return isLive ? <LiveVideoFile {...props} /> : <StillVideoFile {...props} />;
}

/** Video of YouTube or Vimeo, played in its player in the presentation, and shown by its still image elsewhere. */
function VideoEmbed({ embed, width, maxHeight, alt }) {
    const isLive = useLiveSlide();

    if (!isLive)
        return <Still image={embed.still} link={embed.link} ratio={WIDE} width={width} maxHeight={maxHeight} alt={alt} />;

    return (
        <iframe
            src={embed.player}
            title={alt || "Video"}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            data-fill={width==="fill" ? "" : undefined}
            className="border-0 bg-black"
            style={boxStyle(width, maxHeight, WIDE)}
        />
    );
}

/** Video from the assets, YouTube or Vimeo, started by hand or as the slide shows, either filling the room left on the slide or at a set width, with an optional caption. */
function Video({ children, src="", poster, autoPlay=false, loop=false, muted=autoPlay, controls=true, align="center", width="fill", maxHeight, alt="", fontSize="xl", color, italic=true, ...props }) {
    const embed = embedOf(src, { autoPlay, loop, muted });
    const video = embed ? (
        <VideoEmbed embed={embed} width={width} maxHeight={maxHeight} alt={alt} />
    ) : (
        <VideoFile src={src} poster={poster} autoPlay={autoPlay} loop={loop} muted={muted} controls={controls} width={width} maxHeight={maxHeight} alt={alt} />
    );

    return (
        <div className="flex flex-col" style={{ alignItems: flexPosition(align) }}>
            {children ? (
                <figure className="flex flex-col w-full" style={{ alignItems: flexPosition(align) }}>
                    {video}
                    <Text as="figcaption" align="center" fontSize={fontSize} color={color} italic={italic} {...props}>
                        {children}
                    </Text>
                </figure>
            ) : (
                video
            )}
        </div>
    );
}

export default Video;
