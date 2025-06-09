import React, { useEffect, useState } from 'react';

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8081/api/employees')
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка: ${res.status}");
                return res.json();
            })
            .then((data) => setEmployees(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>Ошибка при загрузке сотрудников: {error}</p>;
    }

    return (
        <div>
            <h1>Список сотрудников</h1>
            {employees.length === 0 ? (
                <p>Сотрудники не найдены</p>
            ) : (
                <ul>
                    {employees.map((employee) => (
                        <li key={employee.id}>
                            {employee.surname} {employee.name} {employee.patronymic} — {employee.employeePost} (ID: {employee.stuffId})
                            <div>Роль: {employee.role}</div>
                            <div>Дата: {employee.date}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        );
}