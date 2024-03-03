import { useState } from 'react';
import FontAwesomeIcon from './FontAwesomeIcon.jsx';
import { useSlidesCount } from '../contexts/SlidesCount.context.jsx';

function ShowHideSlidesCountButton() {
    const { state, dispatch } = useSlidesCount();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseHover = () => {
        setIsHovered(!isHovered);
    };
    
    return (
        <div className="relative inline-block">
            <button onClick={() => dispatch({ type: "toggleVisible" })} onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover} className="text-gray-600 transition ease-in-out delay-50 hover:text-gray-700 hover:bg-gray-300 py-2 px-3 rounded-full outline-none">
                {state.isVisible
                    ? <FontAwesomeIcon icon={"fa-eye"} />
                    : <FontAwesomeIcon icon={"fa-eye-slash"} />
                }
            </button>
            {isHovered && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md bg-opacity-75">
                    {state.isVisible
                        ? "Hide slide numbers"
                        : "Show slide numbers"
                    }
                </div>
            )}
        </div>
    );
}

export default ShowHideSlidesCountButton;