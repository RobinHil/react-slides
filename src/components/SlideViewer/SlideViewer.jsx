function SlideViewer({ children }) {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-white p-2 shadow-2xl rounded-xl h-full w-full border m-4">
                {children}
            </div>
        </div>
    );
}

export default SlideViewer;