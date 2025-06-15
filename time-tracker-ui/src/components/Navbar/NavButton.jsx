import React from 'react';
import {Link} from "react-router-dom";

function NavButton({ path, label }) {
    return (
        <Link to={path}>
            <button>{label}</button>
        </Link>
    );
}

// function NavButton({ path, label }) {
//     const handleClick = () => {
//         window.location.href = path;
//     };
//
//     return (
//         <button onClick={handleClick}>
//             {label}
//         </button>
//     );
// }

export default NavButton;