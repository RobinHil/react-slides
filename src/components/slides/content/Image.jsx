import classNames from "classnames";
import { flexAlign } from "./theme";

function Image({ children, src="", alt="", align="left" }) {
    const combinedStyle = classNames("flex flex-col", flexAlign[align]);
    return (
        <div className={combinedStyle}>
            <div>
                <img src={src} alt={alt} />
                {children && (
                    <p className="text-black text-md italic text-center">{children}</p>
                )}
            </div>
        </div>
    );
}

export default Image;