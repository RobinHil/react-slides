/** Font Awesome icon drawn as an inline SVG, so only the icons in use reach the bundle. */
function Icon({ icon, className="h-5" }) {
    const [width, height, , , path] = icon.icon;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className={`overflow-visible ${className}`} fill="currentColor" aria-hidden="true">
            <path d={path} />
        </svg>
    );
}

export default Icon;
