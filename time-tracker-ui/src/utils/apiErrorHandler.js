/**
 * Универсальный обработчик ошибок API-запросов
 * @param {Error} error - Объект ошибки Axios
 * @throws {Error} Кастомная ошибка с понятным сообщением
 */
export const handleApiError = (error) => {
    // Ошибка с ответом от сервера (4xx, 5xx)
    if (error.response) {
        const { status, data } = error.response;
        console.error('Ошибка сервера:', {
            status,
            data,
            url: error.config.url
        });

        const errorMessage = data.message || `HTTP ошибка ${status}`;
        throw new Error(errorMessage);
    }

    // Запрос был сделан, но ответ не получен
    if (error.request) {
        console.error('Нет ответа от сервера:', {
            request: error.request,
            url: error.config.url
        });
        throw new Error('Сервер не отвечает. Проверьте подключение к сети');
    }

    // Ошибка при настройке запроса
    console.error('Ошибка при настройке запроса:', error.message);
    throw new Error('Не удалось отправить запрос');
};

/**
 * Обертка для API-запросов с автоматической обработкой ошибок
 * @param {Promise} request - Promise с API-запросом
 * @returns {Promise} - Результат запроса или обработанная ошибка
 */
export const withErrorHandling = async (request) => {
    try {
        return await request;
    } catch (error) {
        return handleApiError(error);
    }
};