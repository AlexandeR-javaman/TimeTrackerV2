import { fetchEmployees } from '../api/employeesApi.js';

export const getEmployeeFullNamesMap = async (jwt) => {
    try {
        const employees = await fetchEmployees(jwt);
        const fullNameMap = new Map();

        employees.forEach((employee) => {
            const fullName = `${employee.surname} ${employee.name} ${employee.patronymic}`.trim();
            fullNameMap.set(employee.stuffId, fullName);
        });

        return fullNameMap;
    } catch (error) {
        console.error('Ошибка при загрузке сотрудников:', error);
        return new Map();
    }
};