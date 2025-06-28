import keycloak from '../keycloak';
import axios from 'axios';

const token = keycloak.token;
const API_URL = process.env.REACT_APP_API_GATEWAY_BASE_URL;
const EMPLOYEE_PATH = process.env.REACT_APP_EMPLOYEE_PATH;

// export const fetchEmployees = async () => {
//
//     const response = await fetch(`${API_URL}${EMPLOYEE_PATH}/api/employees`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//
//     if (!response.ok) {
//         throw new Error('Ошибка при загрузке данных сотрудников');
//     }
//
//     return await response.json();
// };
export const fetchEmployees = async () => {
    const response = await axios.get(`${API_URL}${EMPLOYEE_PATH}/api/employees`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const registerEmployee = async (employee) => {
    const token = keycloak.token;

    const response = await axios.post(
        `${API_URL}${EMPLOYEE_PATH}/api/employees`,
        employee,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};