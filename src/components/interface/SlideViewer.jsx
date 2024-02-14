import { useShowSlidesNumber } from "../../contexts/ShowSlidesNumber.context";
import { useSlidesCount } from "../../contexts/SlidesCount.context";
import { useFullScreen } from "../../contexts/FullScreen.context";

function SlideViewer({ children }) {
    const { count, maxSlide } = useSlidesCount();
    const { isVisible } = useShowSlidesNumber();
    const { isFullScreen } = useFullScreen();

    return (
        <div className={`flex-grow ${isFullScreen ? 'fixed inset-0' : ''}`}>
            <div className="flex items-center h-full pb-4">
                <div className={`bg-white h-full w-full ${isFullScreen ? 'pt-4' : 'shadow-2xl p-4 m-4 border rounded-xl'}`}>
                    {children}
                    {isVisible && (
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-600 ${isFullScreen ? 'mb-4' : 'mb-7'}`}>
                            <span className="text-md">{count}/{maxSlide}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SlideViewer;