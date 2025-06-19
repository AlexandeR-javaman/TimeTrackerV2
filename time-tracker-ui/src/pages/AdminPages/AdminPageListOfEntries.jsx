import React, {useEffect, useRef, useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CustomTable from '../../components/CustomTable';
import { fetchLogEntries } from '../../api/logEntriesApi';
import { exportTableToCSV } from '../../utils/ExportUtils';
import { loadLogEntriesWithEmployeeInfo } from '../../api/loadLogEntriesWithEmployeeInfoApi';
import { getEmployeeFullNamesMap } from '../../utils/EmployeeFullNames';
import {fetchLogEntriesByEmployee} from "../../api/logEntriesByEmployeeApi";

const AdminPageListOfEntries = () => {
    const role = 'Admin';
    const username = 'Иван Петров';
    const jwt = localStorage.getItem('token');
    const tableRef = useRef(null);
    const [fullNameMap, setFullNameMap] = useState(new Map());

    useEffect(() => {
        getEmployeeFullNamesMap(jwt).then(setFullNameMap);
    }, [jwt]);


    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const columns = [
        { key: 'id', label: 'Номер смены', width: '5%' },
        { key: 'employeeId', label: 'Таб. № сотрудн.', width: '5%' },
        {
            key: 'fullName',
            label: 'ФИО',
            width: '25%',
            // render: (value, row) => fullNameMap.get(row.employeeId) || '—',
        },
        { key: 'startTime', label: 'Начало смены', width: '20%' },
        { key: 'endTime', label: 'Окончание смены', width: '20%' },
        { key: 'jobTime', label: 'Часов отработано', width: '5%' },
        { key: 'message', label: 'Сообщение', width: '20%' },
    ];

    const handleExport = () => {
        if (!tableRef.current) return;
        exportTableToCSV('Все смены.csv', tableRef.current);
    };

    return (
        <>
            <Navbar role={role} username={username} onLogout={handleLogout} />
            <div className="content">
                <h2 className="table-title">Таблица смен из базы данных</h2>
                <CustomTable
                    ref={tableRef}
                    columns={columns}
                    loadData={async () => {
                        const response = await fetchLogEntries(jwt);
                        return response.map(item => ({
                            ...item,
                            jobTime: `${item.jobTime} ч.`,
                            fullName: fullNameMap.get(item.employeeId) || '—',
                        }));
                    }}
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
