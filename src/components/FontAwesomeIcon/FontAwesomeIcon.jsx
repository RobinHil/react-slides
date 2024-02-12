import './FontAwesomeIcon.css';

function FontAwesomeIcon({ icon, size="text-xl" }) {
    return (
        <i class={ `fa-solid ${icon} ${size}` } />
    );
}

export default FontAwesomeIcon;