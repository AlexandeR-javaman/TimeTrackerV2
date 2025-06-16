import React from 'react';
import NavButton from './NavButton';

const EmployeeNavbar = ({ username, onLogout }) => {
    return (
        <div>
            <NavButton path="/employee/logentry" label="Мои смены" />
            <NavButton path="/startTime" label="Начать смену" />
            <NavButton path="/endTime" label="Завершитьсмену" />
        </div>
    );
};

export default EmployeeNavbar;