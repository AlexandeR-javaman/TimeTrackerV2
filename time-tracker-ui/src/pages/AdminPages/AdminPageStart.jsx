import React, { useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';


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
            <Navbar role={role} username={username} onLogout={handleLogout} />
            <div className="content">
                <h2 className="title">Добро пожаловать на страницу Администратора</h2>
            </div>
        </>
    );
};

export default AdminPageStart;
