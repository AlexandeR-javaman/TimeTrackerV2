import AdminNavbar from './AdminNavbar';
import EmployeeNavbar from './EmployeeNavbar';
import NavButton from './NavButton';
import React from "react";

const Navbar = ({ role, username, onLogout }) => {
    const rolePaths = {
        Admin: '/admin',
        User: '/employee'
    };
    const profilePath = rolePaths[role] || '/';
    const roleIcons = {
        Admin: '👑',
        User: '👤',
        Manager: '💼'
    };
    const icon = roleIcons[role] || '🔹';

    return (
        <nav className="navbar">
            <NavButton path={profilePath} label={`${icon} ${username} (${role})`} />
            <div className="navbar-links">
                {role === 'Admin' && <AdminNavbar/>}
                {role === 'User' && <EmployeeNavbar/>}
            </div>
            <button className="navbar-logout" onClick={onLogout}>Выход</button>
        </nav>
    );
};

export default Navbar;
