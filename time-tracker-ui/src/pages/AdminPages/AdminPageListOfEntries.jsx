import React, { useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CustomTable from '../../components/CustomTable';
import { fetchLogEntries } from '../../api/logEntriesApi';
import { exportTableToCSV } from '../../utils/ExportUtils';

const AdminPageListOfEntries = () => {
    const role = 'Admin';
    const username = 'Иван Петров';
    const jwt = localStorage.getItem('token'); // или получить из контекста
    const tableRef = useRef(null); // Создаем ref для таблицы

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/logout';
    };

    const columns = [
        { key: 'id', label: 'Номер смены', width: '5%' },
        { key: 'employeeId', label: 'Таб. № сотрудн.', width: '5%' },
        { key: 'startTime', label: 'Начало смены', width: '30%' },
        { key: 'endTime', label: 'Окончание смены', width: '30%' },
        { key: 'jobTime', label: 'Часов отработано', width: '10%' },
        { key: 'message', label: 'Сообщение', width: '20%' },
    ];

    const handleExport = () => {
        if (!tableRef.current) return;
        exportTableToCSV('Персонал.csv', tableRef.current);
    };

    return (
        <>
            <Navbar role={role} username={username} onLogout={handleLogout} />
            <div className="content">
                <h2 className="table-title">Таблица смен из базы данных</h2>
                <CustomTable
                    ref={tableRef} // Передаем ref в таблицу
                    columns={columns}
                    loadData={() => fetchLogEntries(jwt)}
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

export default AdminPageListOfEntries;
