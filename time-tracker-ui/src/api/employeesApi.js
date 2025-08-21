import axios from 'axios';
import { getValidToken } from '../utils/authUtils'; // Функция для получения актуального токена
import {handleApiError, withErrorHandling} from '../utils/apiErrorHandler'; // обработка ошибок

const API_URL = process.env.REACT_APP_API_GATEWAY_BASE_URL;
const EMPLOYEE_PATH = process.env.REACT_APP_EMPLOYEE_PATH;

export const fetchEmployees = async () => {
    try {
        const token = await getValidToken();
        const response = await axios.get(`${API_URL}${EMPLOYEE_PATH}/api/employees`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const registerEmployee = async (employee) => {
    try {
        const token = await getValidToken();
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
    } catch (error) {
        handleApiError(error);
    }
};

export const updateEmployee = async (id, updatedData) => {
    try {
        const token = await getValidToken();
        const response = await axios.patch(
            `${API_URL}${EMPLOYEE_PATH}/api/employees/${id}`,
            updatedData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('отправляем данные на сервер:', updatedData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// export const updateEmployee = async (id, updatedData) => {
//     try {
//         const response = await fetch(`/api/employees/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedData),
//         });
//
//         if (!response.ok) {
//             throw new Error('Ошибка при обновлении сотрудника');
//         }
//
//         return await response.json();
//     } catch (error) {
//         console.error('Error updating employee:', error);
//         throw error;
//     }
// };