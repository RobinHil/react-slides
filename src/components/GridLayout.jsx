import { flexPosition } from './styles.js';

/** Lays its children out in equal columns. */
function GridLayout({ children, columns=2, gap=8, verticalAlign }) {
    return (
        <div className="grid" style={{ alignItems: flexPosition(verticalAlign), gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: `${gap/4}rem` }}>
            {children}
        </div>
    );
}

export default GridLayout;
