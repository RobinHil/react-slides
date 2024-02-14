import { useState } from 'react';
import FontAwesomeIcon from "../FontAwesomeIcon/FontAwesomeIcon.jsx";
import { useFullScreen } from '../../contexts/FullScreen.context.jsx';

function FullScreenButton() {
    const { toggleFullScreen } = useFullScreen();

    return (
        <div className="relative inline-block">
            <button onClick={toggleFullScreen} className="text-gray-600 transition ease-in-out delay-50 hover:text-gray-700 hover:bg-gray-300 py-2 px-3 rounded-full outline-none">
                <FontAwesomeIcon icon={"fa-expand"} />
            </button>
        </div>
    );
}

export default FullScreenButton;