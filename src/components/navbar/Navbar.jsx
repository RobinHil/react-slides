import { useState } from 'react';

function Navbar() {
    return (
        <div className="bg-white shadow-lg rounded-full p-3 m-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">React Slides</h1>
            <SlideCounter limit={10} />
            <ShowButton isVisible={true} />
        </div>
    );
}

function ShowButton() {
    const [isVisible, setVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        setVisible(!isVisible);
    };

    const handleMouseHover = () => {
        setIsHovered(!isHovered);
    };
    
    return (
        <div className="relative inline-block">
            <button onClick={handleClick} onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover} className="text-gray-600 transition ease-in-out delay-50 hover:text-gray-700 hover:bg-gray-300 py-2 px-3 rounded-full">
                {isVisible
                    ? <i class="fa-solid fa-eye text-xl" />
                    : <i class="fa-solid fa-eye-slash text-lg" />
                }
            </button>
            {isHovered && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md">
                    {isVisible
                        ? 'Hide slide numbers'
                        : 'Show slide numbers'
                    }
                </div>
            )}
        </div>
    );
}

function SlideCounter({ limit }) {
    const [count, setCount] = useState(1);

    const handleChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value)) {
        if (value > limit)
          setCount(limit);
        else if (value < 1)
          setCount(1);
        else
          setCount(value);
      }
    };
  
    const decrement = () => {
      setCount(count-1<1?limit:count-1);
    };
  
    const increment = () => {
      setCount(count+1>limit?limit:count+1);
    };

    const first = () => {
      setCount(1);
    };

    const last = () => {
      setCount(limit);
    };
  
    return (
        <div className="flex bg-white rounded-lg w-64">
            <button onClick={first} data-action="first" className="w-1/3 text-gray-600 transition ease-in-out delay-50 hover:text-gray-700 hover:bg-gray-300 h-full rounded-lg flex items-center justify-center focus:outline-none">
                <i class="fa-solid fa-backward-fast text-xl" />
            </button>
            <button onClick={decrement} data-action="decrement" className="w-1/3 text-gray-600 transition ease-in-out delay-50 hover:text-gray-700 hover:bg-gray-300 h-full rounded-lg flex items-center justify-center focus:outline-none">
                <i class="fa-solid fa-caret-left text-xl" />
            </button>
            <input className="w-1/3 text-center bg-white font-semibold text-md text-gray-700 transition ease-in-out delay-50 hover:text-gray-800 hover:bg-gray-300 rounded-lg outline-none focus:outline-none" name="custom-input-number" value={count} onChange={handleChange} />
            <button onClick={increment} data-action="increment" className="w-1/3 text-gray-600 transition ease-in-out delay-50 hover:text-gray-700 hover:bg-gray-300 h-full rounded-lg flex items-center justify-center focus:outline-none">
                <i class="fa-solid fa-caret-right text-xl" />
            </button>
            <button onClick={last} data-action="last" className="w-1/3 text-gray-600 transition ease-in-out delay-50 hover:text-gray-700 hover:bg-gray-300 h-full rounded-lg flex items-center justify-center focus:outline-none">
                <i class="fa-solid fa-forward-fast text-xl" />
            </button>
        </div>
    );
}

export default Navbar;