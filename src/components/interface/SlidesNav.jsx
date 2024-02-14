import SlidesNavButton from './SlidesNavButton.jsx';
import FontAwesomeIcon from './FontAwesomeIcon.jsx';
import { useSlidesCount } from '../../contexts/SlidesCount.context.jsx';
import { useEffect } from 'react';

function SlidesNav() {
    const { count, changeSlidesCount, decrementSlidesCount, incrementSlidesCount, firstSlidesCount, lastSlidesCount } = useSlidesCount();

    useEffect(() => {
        function handleKeyDown(event) {
            switch (event.keyCode) {
                case 39: {
                    incrementSlidesCount();
                    break;
                }
                case 37: {
                    decrementSlidesCount();
                    break;
                }
                case 38: {
                    lastSlidesCount();
                    break;
                }
                case 40: {
                    firstSlidesCount();
                    break;
                }
                default: {
                    break;
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [decrementSlidesCount, incrementSlidesCount, firstSlidesCount, lastSlidesCount]);

    return (
        <div className="flex bg-white rounded-lg w-64">
            <SlidesNavButton onNavButtonClick={firstSlidesCount}>
                <FontAwesomeIcon icon={"fa-backward-fast"} />
            </SlidesNavButton>
            <SlidesNavButton onNavButtonClick={decrementSlidesCount}>
                <FontAwesomeIcon icon={"fa-caret-left"} />
            </SlidesNavButton>
            <input value={count} onChange={(e) => changeSlidesCount(parseInt(e.target.value))} name="slide-number-input" className="w-1/3 text-center bg-white font-semibold text-md text-gray-700 transition ease-in-out delay-50 hover:text-gray-800 hover:bg-gray-300 rounded-lg outline-none" />
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