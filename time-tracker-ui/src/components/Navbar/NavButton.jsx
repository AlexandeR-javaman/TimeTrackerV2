// components/NavButton.jsx
import React from 'react';

function NavButton({ path, label }) {
    const handleClick = () => {
        window.location.href = path;
    };

    return (
        <button onClick={handleClick}>
            {label}
        </button>
    );
}

export default NavButton;