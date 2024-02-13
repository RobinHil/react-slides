import NavButton from './NavButton.jsx';
import FontAwesomeIcon from '../../FontAwesomeIcon/FontAwesomeIcon.jsx';
import { useSlidesCount } from '../../../contexts/SlidesCount.context.jsx';

function SlidesNav() {
    const { count, handleChange, handleDecrement, handleIncrement, handleFirst, handleLast } = useSlidesCount();

    return (
        <div className="flex bg-white rounded-lg w-64">
            <NavButton onNavButtonClick={handleFirst}>
                <FontAwesomeIcon icon={"fa-backward-fast"} />
            </NavButton>
            <NavButton onNavButtonClick={handleDecrement}>
                <FontAwesomeIcon icon={"fa-caret-left"} />
            </NavButton>
            <input className="w-1/3 text-center bg-white font-semibold text-md text-gray-700 transition ease-in-out delay-50 hover:text-gray-800 hover:bg-gray-300 rounded-lg outline-none" value={count} onChange={(e) => handleChange(parseInt(e.target.value))} />
            <NavButton onNavButtonClick={handleIncrement}>
                <FontAwesomeIcon icon={"fa-caret-right"} />
            </NavButton>
            <NavButton onNavButtonClick={handleLast}>
                <FontAwesomeIcon icon={"fa-forward-fast"} />
            </NavButton>
        </div>
    );
}

export default SlidesNav;