import { useSlidesCount } from "../contexts/SlidesCount.context";

function SlideLoader({ slides }) {
    const { count } = useSlidesCount();

    const Slide = slides[count-1];

    return (
        <Slide />
    );
}

export default SlideLoader;