import classNames from "classnames";

function Image({ children, src="", alt="", align="start" }) {
    const combinedStyle = classNames `flex flex-col items-${align}`;
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