import AdminNavbar from './AdminNavbar';
import EmployeeNavbar from './EmployeeNavbar';
import NavButton from './NavButton';
import React from "react";

const Navbar = ({ role, username, onLogout }) => {
    return (
        <nav className="navbar">
            <NavButton path="/admin" label={`👤 ${username} (${role})`} />
            <div className="navbar-links">
                {role === 'Admin' && <AdminNavbar/>}
                {role === 'Employee' && <EmployeeNavbar/>}
            </div>
            <button className="navbar-logout" onClick={onLogout}>Выход</button>
        </nav>
    );
};

export default Navbar;
