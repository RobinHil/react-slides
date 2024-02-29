import { useSlidesCount } from '../contexts/SlidesCount.context';
import { useFullScreen } from '../contexts/FullScreen.context';

function SlideViewer({ children }) {
    const { state } = useSlidesCount();
    const { isFullScreen } = useFullScreen();

    return (
        <div className={`flex-grow ${isFullScreen?"fixed inset-0":""}`}>
            <div className="flex items-center h-full pb-4">
                <div className={`bg-white h-full w-full p-5 pb-8 ${isFullScreen?"max-w-full":"shadow-2xl m-4 border rounded-xl"}`}>
                    {children}
                    {state.isVisible && (
                        <div className={`fixed left-1/2 text-gray-600 ${isFullScreen?"bottom-2":"bottom-6"}`}>
                            <span className="text-base">{state.count}/{state.maxSlide}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SlideViewer;