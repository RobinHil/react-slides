import { useSlidesCount } from '../contexts/SlidesCount.context.jsx';
import { useMosaic } from '../contexts/Mosaic.context.jsx';
import { useFullScreen } from '../contexts/FullScreen.context.jsx';

function Mosaic() {
    const { state, dispatch } = useSlidesCount();
    const { isVisible } = useMosaic();
    const { isFullScreen } = useFullScreen();

    return (
        <div className={`fixed top-0 left-0 bottom-0 w-36 text-white p-4 flex flex-col overflow-auto transition duration-300 ${isVisible&&!isFullScreen?"translate-x-0":"-translate-x-full"}`}>
            {Array.from({ length: state.maxSlide }, (_, index) => (
                <button
                    key={index+1}
                    className={`w-full h-14 min-h-12 flex items-center justify-center mb-2 font-semibold rounded-lg outline-none ${state.count===index+1?"bg-gray-400":"bg-gray-600 transition ease-in-out delay-50 hover:bg-gray-500"}`}
                    onClick={() => dispatch({ type: "change", payload: index+1 })}
                >
                    {index+1}
                </button>
            ))}
        </div>
    );
};

export default Mosaic;
