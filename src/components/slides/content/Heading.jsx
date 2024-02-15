function Heading({ children, fontSize="6xl", align="left" }) {
    const combinedStyle = `text-black text-${fontSize} font-bold text-${align}`;
    return (
        <h1 className={combinedStyle}>{children}</h1>
    );
}

export default Heading;