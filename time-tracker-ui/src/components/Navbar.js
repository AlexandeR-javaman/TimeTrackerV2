// components/Navbar.js
import React from 'react';
import NavButton from './NavButton';

function Navbar() {
    const navItems = [
        { path: 'journal', label: 'Журнал работы сотрудников' },
        { path: 'logEntry', label: 'Журнал смен' },
        { path: 'addEmployee', label: 'Новый сотрудник' },
        { path: '/logout', label: 'Выход' },
    ];

    return (
        <div className="navbar">
            {navItems.map((item, index) => (
                <NavButton key={index} path={item.path} label={item.label} />
            ))}
        </div>
    );
}

export default Navbar;