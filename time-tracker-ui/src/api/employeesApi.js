import keycloak from '../keycloak';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_GATEWAY_BASE_URL;
const EMPLOYEE_PATH = process.env.REACT_APP_EMPLOYEE_PATH;

// Функция для получения актуального токена
const getValidToken = async () => {
    try {
        // Обновляем токен, если он протух
        const refreshed = await keycloak.updateToken(30);
        if (refreshed) {
            console.log("Токен обновлён:", keycloak.token);
        }

        // Убираем "Bearer ", если он уже есть в токене
        return keycloak.token.startsWith("Bearer ")
            ? keycloak.token.slice(7)
            : keycloak.token;
    } catch (err) {
        console.error("Ошибка обновления токена:", err);
        throw err;
    }
};

export const fetchEmployees = async () => {
    const token = await getValidToken();
    const response = await axios.get(`${API_URL}${EMPLOYEE_PATH}/api/employees`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const registerEmployee = async (employee) => {
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
};