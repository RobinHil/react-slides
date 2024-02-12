import { useState } from 'react';
import NavButton from './NavButton.jsx';
import FontAwesomeIcon from '../../FontAwesomeIcon/FontAwesomeIcon.jsx';

function SlidesNav({ maxSlide=1 }) {
    const [count, setCount] = useState(1);

    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            if (value > maxSlide)
                setCount(maxSlide);
            else if (value < 1)
                setCount(1);
            else
                setCount(value);
        }
    };
  
    const handleDecrement = () => {
        setCount(count-1<1?maxSlide:count-1);
    };
  
    const handleIncrement = () => {
        setCount(count+1>maxSlide?maxSlide:count+1);
    };

    const handleFirst = () => {
        setCount(1);
    };

    const handleLast = () => {
        setCount(maxSlide);
    };
  
    return (
        <div className="flex bg-white rounded-lg w-64">
            <NavButton onNavButtonClick={() => handleFirst()}>
                <FontAwesomeIcon icon={"fa-backward-fast"} />
            </NavButton>
            <NavButton onNavButtonClick={() => handleDecrement()}>
                <FontAwesomeIcon icon={"fa-caret-left"} />
            </NavButton>
            <input className="w-1/3 text-center bg-white font-semibold text-md text-gray-700 transition ease-in-out delay-50 hover:text-gray-800 hover:bg-gray-300 rounded-lg outline-none focus:outline-none" name="custom-input-number" value={count} onChange={handleChange} />
            <NavButton onNavButtonClick={() => handleIncrement()}>
                <FontAwesomeIcon icon={"fa-caret-right"} />
            </NavButton>
            <NavButton onNavButtonClick={() => handleLast()}>
                <FontAwesomeIcon icon={"fa-forward-fast"} />
            </NavButton>
        </div>
    );
}

export default SlidesNav;