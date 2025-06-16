import React, { useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CustomTable from '../../components/CustomTable';
import { fetchLogEntriesByEmployee } from '../../api/logEntriesByEmployeeApi';
import { exportTableToCSV } from '../../utils/ExportUtils';

const EmployeePageListOfEntries = () => {
    const role = 'User';
    const username = 'Петр Иванов';
    const jwt = localStorage.getItem('token'); // или получить из контекста
    const tableRef = useRef(null); // Создаем ref для таблицы

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const columns = [
        { key: 'id', label: 'Номер смены', width: '5%' },
        { key: 'employeeId', label: 'Таб. № сотрудн.', width: '5%' },
        { key: 'startTime', label: 'Начало смены', render: (time) => new Date(time).toLocaleString(), width: '30%' },
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
                    columns={columns} // Без render-функций!
                    loadData={async () => {
                        const response = await fetchLogEntriesByEmployee(jwt);
                        return response.logEntryList.map(item => ({
                            ...item,
                            startTime: new Date(item.startTime).toLocaleString(),
                            endTime: new Date(item.endTime).toLocaleString(),
                            jobTime: `${item.jobTime} ч.`
                        }));
                    }}
                />
                {/*<CustomTable*/}
                {/*    ref={tableRef} // Передаем ref в таблицу*/}
                {/*    columns={columns}*/}
                {/*    loadData={async () => {*/}
                {/*        const response = await fetchLogEntriesByEmployee(jwt);*/}
                {/*        return response.logEntryList; // <- Важно: передаём массив, а не весь объект*/}
                {/*    }}*/}
                {/*/>*/}
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

export default EmployeePageListOfEntries;