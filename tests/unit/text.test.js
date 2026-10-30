import { describe, expect, it } from 'vitest';
import dedent from '../../src/components/dedent.js';
import pageNumber from '../../src/components/pageNumber.js';
import { formatDuration } from '../../src/interface/time.js';

describe("dedent", () => {
    it("removes the indentation shared by every line and the blank edges", () => {
        expect(dedent(`
            ## Title

              - item
            Text
        `)).toBe("## Title\n\n  - item\nText");
    });

    it("keeps a text without indentation", () => {
        expect(dedent("one\ntwo")).toBe("one\ntwo");
    });
});

describe("pageNumber", () => {
    it("shows the slide number out of the total", () => {
        expect(pageNumber({ number: 3, total: 16 })).toBe("3 / 16");
    });
});

describe("formatDuration", () => {
    it("writes minutes and seconds", () => {
        expect(formatDuration(0)).toBe("00:00");
        expect(formatDuration(999)).toBe("00:00");
        expect(formatDuration(61000)).toBe("01:01");
        expect(formatDuration(59*60000+59000)).toBe("59:59");
    });

    it("adds the hours once there are some", () => {
        expect(formatDuration(3600000)).toBe("01:00:00");
        expect(formatDuration(3723000)).toBe("01:02:03");
    });
});
