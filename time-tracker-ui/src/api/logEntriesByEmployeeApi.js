export const fetchLogEntriesByEmployee = async (jwt) => {
    const response = await fetch('http://localhost:8080/api/log_entries/2', {
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

    if (!data.logEntryList) {
        return data;
    }

    const processedData = {
        ...data,
        logEntryList: data.logEntryList.map(item => ({
            ...item,
            startTime: new Date(item.startTime).toLocaleString(),
            endTime: new Date(item.endTime).toLocaleString(),
            // date нет в исходных данных, не во всех DTO добавлял дату
            date: item.date ? new Date(item.date).toLocaleDateString() : undefined,
        })),
    };

    return processedData;
};