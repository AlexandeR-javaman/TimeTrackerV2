// components/NavButton.js
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