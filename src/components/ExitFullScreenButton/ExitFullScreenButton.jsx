import { useEffect, useState } from "react";

function ExitFullScreenButton() {
    const [showButton, setShowButton] = useState(false);
  
    useEffect(() => {
        const handleMouseMove = (e) => {
            const windowHeight = window.innerHeight;
            const mouseY = e.clientY;
    
            setShowButton(mouseY > windowHeight * 0.935);
        };
    
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
  
    return (
        <div className={`${showButton ? 'block' : 'hidden'} fixed bottom-2 right-2`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Scroll to Bottom
            </button>
        </div>
    );
};

export default ExitFullScreenButton;