import { useSlidesCount } from "../contexts/SlidesCount.context";
import { useFullScreen } from "../contexts/FullScreen.context";

function SlideViewer({ children }) {
    const { count, maxSlide, isVisible } = useSlidesCount();
    const { isFullScreen } = useFullScreen();

    return (
        <div className={`flex-grow ${isFullScreen ? 'absolute' : ''}`}>
            <div className="flex items-center h-full pb-4">
                <div className={`bg-white h-full w-full p-10 ${isFullScreen ? '' : 'shadow-2xl m-4 border rounded-xl'}`}>
                    {children}
                    {isVisible && (
                        <div className="relative">
                            <div className={`absolute bottom-0 left-1/2 translate-x-1/2 text-gray-600 ${isFullScreen ? '-m-10' : '-m-12'}`}>
                                <span className="text-md">{count}/{maxSlide}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SlideViewer;