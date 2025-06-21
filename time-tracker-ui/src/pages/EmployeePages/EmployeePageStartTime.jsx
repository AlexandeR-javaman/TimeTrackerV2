import React, { useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import StartLogButton from "../../components/StartEndButton/StartLogButton";


const EmployeePageStart = () => {
    const role = 'User';
    const username = 'Петр Иванов';
    const jwt = localStorage.getItem('token'); // или получить из контекста
    const tableRef = useRef(null); // Создаем ref для таблицы
    const employeeId = 3;

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };


    return (
        <>
            <Navbar role={role} username={username} onLogout={handleLogout} />
            <div className="content">
                <h2 className="title">Начните смену</h2>
                <StartLogButton employeeId={employeeId} />
            </div>
        </>
    );
};

export default EmployeePageStart;
