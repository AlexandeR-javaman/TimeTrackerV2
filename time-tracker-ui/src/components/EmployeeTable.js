import React from 'react';
import { exportTableToCSV } from '../utils/ExportUtils';

function EmployeeTable({ employees, isLoading, error }) {
    return (
        <div className="employee-table">
            <h1>Таблица сотрудников из базы данных</h1>
            <table>
                <thead>
                <tr>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Табельный номер</th>
                    <th>Должность</th>
                </tr>
                </thead>
                <tbody>
                {error ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center', color: 'red' }}>
                            {error}
                        </td>
                    </tr>
                ) : isLoading ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>
                            Загрузка данных...
                        </td>
                    </tr>
                ) : employees.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>
                            Нет данных о сотрудниках
                        </td>
                    </tr>
                ) : (
                    employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.surname}</td>
                            <td>{employee.name}</td>
                            <td>{employee.patronymic}</td>
                            <td>{employee.stuffId}</td>
                            <td>{employee.employeePost}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            {!isLoading && !error && employees.length > 0 && (
                <button
                    className="export-button"
                    onClick={() => exportTableToCSV('Персонал.csv')}
                >
                    Выгрузить
                </button>
            )}
        </div>
    );
}

export default EmployeeTable;