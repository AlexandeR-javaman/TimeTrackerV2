import React, { useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import EmployeeRegistrationForm from "../../api/addEmployeeButton";


const AdminPageStart = () => {
    const role = 'Admin';
    const username = 'Иван Петров';
    const jwt = localStorage.getItem('token'); // или получить из контекста
    const tableRef = useRef(null); // Создаем ref для таблицы

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };


    return (
        <>
            <Navbar role={role} username={username} onLogout={handleLogout}/>
            <div className="App">
                <EmployeeRegistrationForm/>
            </div>
        </>
    );
};

export default AdminPageStart;
