import SlidesNavButton from './SlidesNavButton.jsx';
import FontAwesomeIcon from './FontAwesomeIcon.jsx';
import { useSlidesCount } from '../contexts/SlidesCount.context.jsx';

function SlidesNav() {
    const { state, dispatch } = useSlidesCount();

    return (
        <div className="flex bg-white rounded-lg w-64">
            <SlidesNavButton onNavButtonClick={() => dispatch({ type: "first" })}>
                <FontAwesomeIcon icon="fa-backward-fast" />
            </SlidesNavButton>
            <SlidesNavButton onNavButtonClick={() => dispatch({ type: "decrement" })}>
                <FontAwesomeIcon icon="fa-caret-left" />
            </SlidesNavButton>
            <input value={state.count} onChange={(event) => dispatch({ type: "change", payload: parseInt(event.target.value) })} name="slide-number-input" className="w-1/3 text-center bg-white font-semibold text-base text-gray-700 transition ease-in-out delay-50 hover:text-gray-800 hover:bg-gray-300 rounded-lg outline-none" />
            <SlidesNavButton onNavButtonClick={() => dispatch({ type: "increment" })}>
                <FontAwesomeIcon icon="fa-caret-right" />
            </SlidesNavButton>
            <SlidesNavButton onNavButtonClick={() => dispatch({ type: "last" })}>
                <FontAwesomeIcon icon="fa-forward-fast" />
            </SlidesNavButton>
        </div>
    );
}

export default SlidesNav;