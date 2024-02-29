import { layoutAlign } from "./theme.js";

function Layout({ children, verticalAlign="vCenter", horizontalAlign="hCenter" }) {
    const combinedStyle = `flex ${layoutAlign[verticalAlign]} ${layoutAlign[horizontalAlign]} justify-end h-full`

    return (
        <div className={combinedStyle}>
            <div>{children}</div>
        </div>
    );
}

export default Layout;