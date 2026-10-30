import { flexPosition } from './styles.js';

/** Lays its children out in a row. */
function RowLayout({ children, gap=8, align="center", verticalAlign="center" }) {
    return (
        <div className="flex" style={{ justifyContent: flexPosition(align), alignItems: flexPosition(verticalAlign), gap: `${gap/4}rem` }}>
            {children}
        </div>
    );
}

export default RowLayout;
