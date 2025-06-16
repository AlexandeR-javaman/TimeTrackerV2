export const fetchLogEntriesByEmployee = async (jwt) => {
    const response = await fetch('http://localhost:8080/api/log_entries/2', {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });

    if (!response.ok) {
        throw new Error('Ошибка при загрузке данных сотрудников');
    }

    return await response.json();
};
