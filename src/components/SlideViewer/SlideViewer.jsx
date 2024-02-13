import { useShowSlidesNumber } from "../../contexts/ShowSlidesNumber.context";
import { useSlidesCount } from "../../contexts/SlidesCount.context";

function SlideViewer({ children }) {
    const { count, maxSlide } = useSlidesCount();
    const { isVisible } = useShowSlidesNumber();

    return (
        <div className="flex items-center h-full pb-4">
            <div className="bg-white p-4 shadow-2xl rounded-xl h-full w-full border m-4">
                {children}
                {isVisible && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-7 text-gray-600">
                        <span className="text-md">{count}/{maxSlide}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SlideViewer;