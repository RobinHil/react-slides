function Paragraph({ children, fontSize="md" }) {
    const combinedStyle = `text-black text-${fontSize}`;
    return (
        <p className={combinedStyle}>{children}</p>
    );
}

export default Paragraph;