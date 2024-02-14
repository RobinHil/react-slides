function FontAwesomeIcon({ icon, size="text-xl" }) {
    return (
        <i className={ `fa-solid ${icon} ${size}` } />
    );
}

export default FontAwesomeIcon;