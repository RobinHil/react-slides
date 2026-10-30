import { createContext, use } from 'react';

const LiveSlideContext = createContext(false);

/** Tells whether the slide is the one being presented, rather than a thumbnail, a preview or a printed page. */
function useLiveSlide() {
    return use(LiveSlideContext);
}

export { useLiveSlide, LiveSlideContext };
