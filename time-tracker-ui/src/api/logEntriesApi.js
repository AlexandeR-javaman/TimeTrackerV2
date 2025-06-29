// import keycloak from '../keycloak';
import axios from 'axios';
import { getValidToken } from '../utils/authUtils'; // Функция для получения актуального токена
import {handleApiError, withErrorHandling} from '../utils/apiErrorHandler'; // обработка ошибок

const API_URL = process.env.REACT_APP_API_GATEWAY_BASE_URL;
const LOG_ENTRY_PATH = process.env.REACT_APP_LOG_ENTRY_PATH;

export const fetchLogEntries = async (jwt) => {
    try {
        const token = await getValidToken();
        const response = await axios.get(`${API_URL}${LOG_ENTRY_PATH}/api/log_entries`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        // return response.data;
        const data = response.data;

        // Если данные приходят в виде массива
        if (Array.isArray(data)) {
            return data.map(item => ({
                ...item,
                startTime: new Date(item.startTime).toLocaleString(),
                endTime: new Date(item.endTime).toLocaleString(),
                date: new Date(item.date).toLocaleDateString()
            }));
        }
        // Если данные приходят как одиночный объект
        // return {
        //     ...data,
        //     startTime: new Date(data.startTime).toLocaleString(),
        //     endTime: new Date(data.endTime).toLocaleString(),
        //     date: new Date(data.date).toLocaleDateString()
        // };

    } catch (error) {
        handleApiError(error);
    }
};
