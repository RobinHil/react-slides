import SlidesNav from './SlidesNav.jsx';
import ShowSlidesCountButton from './ShowSlidesCountButton.jsx';
import FullScreenButton from './FullScreenButton.jsx';
import MosaicButton from './MosaicButton.jsx';

function Toolbar() {
    return (
        <div className="bg-white shadow-lg rounded-full p-3 m-4 flex justify-between items-center relative border">
            <MosaicButton />
            <SlidesNav />
            <div>
                <ShowSlidesCountButton />
                <FullScreenButton />
            </div>
        </div>
    );
}

export default Toolbar;