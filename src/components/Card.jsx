import { backgroundStyle } from './styles.js';

/** Rounded box with a light border and shadow, to group content. */
function Card({ children, bg="white" }) {
    return (
        <div className="h-full rounded-2xl ring-1 ring-black/10 shadow-xs px-6 py-5" style={backgroundStyle(bg)}>
            {children}
        </div>
    );
}

export default Card;
