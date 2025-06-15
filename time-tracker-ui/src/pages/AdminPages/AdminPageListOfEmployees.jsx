import React, { useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CustomTable from '../../components/CustomTable';
import { fetchEmployees } from '../../api/employeesApi';
import { exportTableToCSV } from '../../utils/ExportUtils';

const AdminPageListOfEmployees = () => {
    const role = 'Admin';
    const username = 'Иван Петров';
    const jwt = localStorage.getItem('token'); // или получить из контекста
    const tableRef = useRef(null); // Создаем ref для таблицы

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/logout';
    };

    const columns = [
        // { key: 'id', label: 'ID', width: 50 },
        { key: 'surname', label: 'Фамилия', width: '25%' },
        { key: 'name', label: 'Имя', width: '20%' },
        { key: 'patronymic', label: 'Отчество', width: '25%' },
        { key: 'stuffId', label: 'Табельный номер', width: '10%' },
        { key: 'employeePost', label: 'Должность', width: '20%' },
    ];

    const handleExport = () => {
        if (!tableRef.current) return;
        exportTableToCSV('Персонал.csv', tableRef.current);
    };

    return (
        <>
            <Navbar role={role} username={username} onLogout={handleLogout} />
            <div className="content">
                <h2 className="table-title">Таблица сотрудников из базы данных</h2>
                <CustomTable
                    ref={tableRef} // Передаем ref в таблицу
                    columns={columns}
                    loadData={() => fetchEmployees(jwt)}
                />
                <div className="table-controls">
                    <button
                        className="export-button"
                        onClick={handleExport}
                    >
                        Выгрузить
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminPageListOfEmployees;
