import keycloak from '../keycloak';

export const fetchEmployees = async () => {

    const token = keycloak.token;
    const API_URL = process.env.REACT_APP_API_GATEWAY_BASE_URL;
    const EMPLOYEE_PATH = process.env.REACT_APP_EMPLOYEE_PATH;
    const response = await fetch(`${API_URL}${EMPLOYEE_PATH}/api/employees`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Ошибка при загрузке данных сотрудников');
    }

    return await response.json();
};