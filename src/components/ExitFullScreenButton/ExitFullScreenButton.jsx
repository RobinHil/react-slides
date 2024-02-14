import { useEffect, useState } from "react";
import FontAwesomeIcon from "../FontAwesomeIcon/FontAwesomeIcon";
import { useFullScreen } from "../../contexts/FullScreen.context";

function ExitFullScreenButton() {
    const { toggleFullScreen, isFullScreen } = useFullScreen();
    const [showButton, setShowButton] = useState(false);
  
    useEffect(() => {
        const handleMouseMove = (e) => {
            const windowHeight = window.innerHeight;
            const mouseY = e.clientY;
    
            setShowButton(mouseY > windowHeight * 0.905);
        };
    
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
  
    return (
        <div className={`${showButton && isFullScreen ? 'block' : 'hidden'} fixed bottom-3 right-3`}>
            <button onClick={toggleFullScreen} className="text-gray-600 bg-white transition ease-in-out delay-50 hover:text-gray-700 hover:bg-gray-300 py-3 px-4 rounded-full outline-none border shadow-xl">
                <FontAwesomeIcon icon={"fa-compress"} size="text-2xl" />
            </button>
        </div>
    );
};

export default ExitFullScreenButton;