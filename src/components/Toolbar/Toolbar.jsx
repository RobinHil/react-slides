import SlidesNav from './SlidesNav/SlidesNav.jsx';
import ShowSlidesNumberButton from './ShowSlidesNumberButton/ShowSlidesNumberButton.jsx';

function Toolbar() {
    return (
        <div className="bg-white shadow-lg rounded-full p-3 m-4 flex justify-between items-center relative">
            <h1 className="text-lg font-semibold text-gray-800">Slides</h1>
            <SlidesNav />
            <ShowSlidesNumberButton />
        </div>
    );
}

export default Toolbar;