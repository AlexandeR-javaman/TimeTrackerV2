// import {fetchEmployees} from "./employeesApi";
// import {fetchLogEntries} from "./logEntriesApi";
//
// export const loadLogEntriesWithEmployeeInfo = async (jwt) => {
//     try {
//         const [employees, logEntries] = await Promise.all([
//             fetchEmployees(jwt),
//             fetchLogEntries(jwt),
//         ]);
//
//         const employeeMap = new Map();
//         employees.forEach((employee) => {
//             employeeMap.set(employee.stuffId, employee);
//         });
//
//         const enrichedLogs = logEntries.map((entry) => {
//             const employee = employeeMap.get(entry.employeeId);
//             const fullName = employee
//                 ? `${employee.surname} ${employee.name} ${employee.patronymic}`.trim()
//                 : '—';
//
//             return {
//                 ...entry,
//                 fullName, // добавляем поле
//             };
//         });
//
//         return enrichedLogs;
//     } catch (error) {
//         console.error('Ошибка при загрузке данных:', error);
//         return [];
//     }
// };
