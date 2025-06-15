import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import EmployeeTable from '../components/EmployeeTable';

const AdminPage = () => {
    const role = 'Admin'; // получено после авторизации
    const username = 'Иван Петров';

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/logout';
    };

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/employees');
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных сотрудников');
                }
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Ошибка:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <>
            <Navbar role={role} username={username} onLogout={handleLogout} />
            <div className="content">
                <EmployeeTable
                    employees={employees}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </>
    );
};

export default AdminPage;

// import React, { useEffect, useState } from 'react';
//
// const AdminPage = () => {
//     const [employees, setEmployees] = useState([]);
//
//     useEffect(() => {
//         fetch('http://localhost:8081/api/employees')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Ошибка при загрузке данных сотрудников');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setEmployees(data);
//             })
//             .catch(error => {
//                 console.error('Ошибка:', error);
//                 // Можно добавить обработку ошибки или показать уведомление
//             });
//     }, []);
//
//     const exportTableToCSV = (filename) => {
//         const rows = Array.from(document.querySelectorAll('table tr'));
//         const csvContent = rows.map(row =>
//             Array.from(row.querySelectorAll('th, td'))
//                 .map(cell => `"${cell.textContent.replace(/"/g, '""')}"`)
//                 .join(';')
//         ).join('\n');
//
//         const bom = '\uFEFF';
//         const fullContent = bom + csvContent;
//         const blob = new Blob([fullContent], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = filename;
//         link.click();
//     };
//
//     return (
//         <>
//             <div className="navbar">
//                 <button onClick={() => window.location.href = 'journal'}>Журнал работы сотрудников</button>
//                 <button onClick={() => window.location.href = 'logEntry'}>Журнал смен</button>
//                 <button onClick={() => window.location.href = 'addEmployee'}>Новый сотрудник</button>
//                 <button onClick={() => window.location.href = '/logout'}>Выход</button>
//             </div>
//
//             <div className="content">
//                 <h1>Таблица сотрудников из базы данных</h1>
//                 <table>
//                     <thead>
//                     <tr>
//                         <th>Фамилия</th>
//                         <th>Имя</th>
//                         <th>Отчество</th>
//                         <th>Табельный номер</th>
//                         <th>Должность</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {employees.length === 0 ? (
//                         <tr>
//                             <td colSpan="5" style={{ textAlign: 'center' }}>Загрузка данных...</td>
//                         </tr>
//                     ) : (
//                         employees.map(employee => (
//                             <tr key={employee.id}>
//                                 <td>{employee.surname}</td>
//                                 <td>{employee.name}</td>
//                                 <td>{employee.patronymic}</td>
//                                 <td>{employee.stuffId}</td>
//                                 <td>{employee.employeePost}</td>
//                             </tr>
//                         ))
//                     )}
//                     </tbody>
//                 </table>
//                 <button className="export-button" onClick={() => exportTableToCSV('Персонал.csv')}>Выгрузить</button>
//             </div>
//         </>
//     );
// };
//
// export default AdminPage;