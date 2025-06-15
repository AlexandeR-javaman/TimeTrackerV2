import React from 'react';
import NavButton from './NavButton';

const AdminNavbar = () => {
    return (
        <div>
            <NavButton path="/journalEmployee" label="Журнал сотрудников" />
            <NavButton path="/logEntry" label="Журнал смен" />
            <NavButton path="/employeeEntry" label="Журнал смен сотрудников" />
            <NavButton path="/addEmployee" label="Добавить сотрудника" />
        </div>
    );
};

export default AdminNavbar;