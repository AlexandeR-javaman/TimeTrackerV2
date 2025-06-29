// import keycloak from '../keycloak';
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