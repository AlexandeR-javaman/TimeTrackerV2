import React, { useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CustomTable from '../../components/CustomTable';
import { fetchEmployees } from '../../api/employeesApi';
import { exportTableToCSV } from '../../utils/ExportUtils';

const AdminPageStart = () => {
    const role = 'Admin';
    const username = 'Иван Петров';
    const jwt = localStorage.getItem('token'); // или получить из контекста
    const tableRef = useRef(null); // Создаем ref для таблицы

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/logout';
    };


    return (
        <>
            <Navbar role={role} username={username} onLogout={handleLogout} />
            <div className="content">
                <h2 className="title">Добро пожаловать на страницу</h2>
            </div>
        </>
    );
};

export default AdminPageStart;
