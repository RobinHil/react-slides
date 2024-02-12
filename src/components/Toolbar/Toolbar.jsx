import SlidesNav from './SlidesNav/SlidesNav.jsx';
import ShowButton from './ShowButton/ShowButton.jsx';

function Toolbar() {
    return (
        <div className="bg-white shadow-lg rounded-full p-3 m-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">Slides</h1>
            <SlidesNav />
            <ShowButton />
        </div>
    );
}

export default Toolbar;