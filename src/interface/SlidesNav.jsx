import SlidesNavButton from './SlidesNavButton.jsx';
import FontAwesomeIcon from './FontAwesomeIcon.jsx';
import { useSlidesCount } from '../contexts/SlidesCount.context.jsx';


function SlidesNav() {
    const { count, changeSlidesCount, decrementSlidesCount, incrementSlidesCount, firstSlidesCount, lastSlidesCount } = useSlidesCount();

    return (
        <div className="flex bg-white rounded-lg w-64">
            <SlidesNavButton onNavButtonClick={firstSlidesCount}>
                <FontAwesomeIcon icon={"fa-backward-fast"} />
            </SlidesNavButton>
            <SlidesNavButton onNavButtonClick={decrementSlidesCount}>
                <FontAwesomeIcon icon={"fa-caret-left"} />
            </SlidesNavButton>
            <input value={count} onChange={(e) => changeSlidesCount(parseInt(e.target.value))} name="slide-number-input" className="w-1/3 text-center bg-white font-semibold text-base text-gray-700 transition ease-in-out delay-50 hover:text-gray-800 hover:bg-gray-300 rounded-lg outline-none" />
            <SlidesNavButton onNavButtonClick={incrementSlidesCount}>
                <FontAwesomeIcon icon={"fa-caret-right"} />
            </SlidesNavButton>
            <SlidesNavButton onNavButtonClick={lastSlidesCount}>
                <FontAwesomeIcon icon={"fa-forward-fast"} />
            </SlidesNavButton>
        </div>
    );
}

export default SlidesNav;