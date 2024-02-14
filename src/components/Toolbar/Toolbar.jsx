import SlidesNav from './SlidesNav/SlidesNav.jsx';
import ShowSlidesNumberButton from './ShowSlidesNumberButton/ShowSlidesNumberButton.jsx';
import FullScreenButton from '../FullScreenButton/FullScreenButton.jsx';

function Toolbar() {
    return (
        <div className="bg-white shadow-lg rounded-full p-3 m-4 flex justify-between items-center relative border">
            <FullScreenButton />
            <SlidesNav />
            <ShowSlidesNumberButton />
        </div>
    );
}

export default Toolbar;