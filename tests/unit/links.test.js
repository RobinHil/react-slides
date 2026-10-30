import { describe, expect, it } from 'vitest';
import { isExternal } from '../../src/components/links.js';
import { embedOf } from '../../src/components/embeds.js';

describe("isExternal", () => {
    it("tells links to other sites", () => {
        expect(isExternal("https://react.dev")).toBe(true);
        expect(isExternal("http://example.org/page")).toBe(true);
    });

    it("keeps links of the site and other schemes in place", () => {
        expect(isExternal(`${location.origin}/demo/`)).toBe(false);
        expect(isExternal("/demo/")).toBe(false);
        expect(isExternal("#7")).toBe(false);
        expect(isExternal("mailto:someone@example.org")).toBe(false);
        expect(isExternal("")).toBe(false);
    });
});

describe("embedOf", () => {
    const none = { autoPlay: false, loop: false, muted: false };

    it("reads every form of YouTube address", () => {
        for (const src of ["https://www.youtube.com/watch?v=aqz-KE-bpKQ", "https://youtube.com/watch?feature=share&v=aqz-KE-bpKQ", "https://youtu.be/aqz-KE-bpKQ", "https://www.youtube.com/embed/aqz-KE-bpKQ", "https://www.youtube.com/shorts/aqz-KE-bpKQ", "https://www.youtube.com/live/aqz-KE-bpKQ", "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ"]) {
            const embed = embedOf(src, none);
            expect(embed.player).toBe("https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?rel=0");
            expect(embed.link).toBe("https://www.youtube.com/watch?v=aqz-KE-bpKQ");
            expect(embed.still).toBe("https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg");
        }
    });

    it("passes the playing options to YouTube", () => {
        const { player } = embedOf("https://youtu.be/aqz-KE-bpKQ", { autoPlay: true, loop: true, muted: true });
        const params = new URL(player).searchParams;
        expect(params.get("autoplay")).toBe("1");
        expect(params.get("mute")).toBe("1");
        expect(params.get("loop")).toBe("1");
        expect(params.get("playlist")).toBe("aqz-KE-bpKQ");
    });

    it("reads Vimeo addresses, without a still picture", () => {
        for (const src of ["https://vimeo.com/76979871", "https://player.vimeo.com/video/76979871"]) {
            const embed = embedOf(src, { autoPlay: true, loop: false, muted: true });
            expect(embed.link).toBe("https://vimeo.com/76979871");
            expect(embed.still).toBeNull();
            const params = new URL(embed.player).searchParams;
            expect(params.get("dnt")).toBe("1");
            expect(params.get("autoplay")).toBe("1");
            expect(params.get("muted")).toBe("1");
            expect(params.has("loop")).toBe(false);
        }
    });

    it("leaves video files alone", () => {
        expect(embedOf("/assets/demo.mp4", none)).toBeNull();
        expect(embedOf("https://example.org/clip.webm", none)).toBeNull();
    });
});
