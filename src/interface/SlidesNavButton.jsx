function SlidesNavButton({ children, onNavButtonClick }) {
    return (
        <button onClick={onNavButtonClick} className="w-1/3 text-gray-600 transition ease-in-out delay-50 hover:text-gray-700 hover:bg-gray-300 h-full rounded-lg flex items-center justify-center outline-none">
            {children} 
        </button>
    );
}

export default SlidesNavButton;