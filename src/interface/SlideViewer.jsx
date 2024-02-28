import { useSlidesCount } from "../contexts/SlidesCount.context";
import { useFullScreen } from "../contexts/FullScreen.context";

function SlideViewer({ children }) {
    const { count, maxSlide, isVisible } = useSlidesCount();
    const { isFullScreen } = useFullScreen();

    return (
        <div className={`flex-grow ${isFullScreen ? 'fixed inset-0' : ''}`}>
            <div className={`flex items-center h-full pb-4 ${isFullScreen ? 'w-full justify-center' : ''}`}>
                <div className={`bg-white h-full w-full p-10 ${isFullScreen ? 'max-w-full' : 'shadow-2xl m-4 border rounded-xl'}`}>
                    {children}
                    {isVisible && (
                        <div className={`absolute left-1/2 text-gray-600 ${isFullScreen ? 'bottom-3' : 'bottom-6'}`}>
                            <span className="text-base">{count}/{maxSlide}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SlideViewer;