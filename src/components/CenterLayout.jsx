/** Centers its content on the slide, vertically and horizontally. */
function CenterLayout({ children }) {
    return (
        <div className="flex items-center justify-center min-h-full">
            <div className="max-w-full">{children}</div>
        </div>
    );
}

export default CenterLayout;
