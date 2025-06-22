export const fetchLogEntries = async (jwt) => {

    const API_URL = process.env.REACT_APP_API_GATEWAY_BASE_URL; //http://localhost:8080/log_entry_service/api/log_entries
    const LOG_ENTRY_PATH = process.env.REACT_APP_LOG_ENTRY_PATH;//http://localhost:8082
    const response = await fetch(`${API_URL}${LOG_ENTRY_PATH}/api/log_entries`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });

    if (!response.ok) {
        throw new Error('Ошибка при загрузке данных сотрудников');
    }

//     return await response.json();
// };
    const data = await response.json();

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
};
