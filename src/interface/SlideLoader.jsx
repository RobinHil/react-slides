import { useSlidesCount } from "../contexts/SlidesCount.context";

function SlideLoader({ slides }) {
    const { state } = useSlidesCount();

    const Slide = slides[state.count-1];

    return (
        <Slide />
    );
}

export default SlideLoader;