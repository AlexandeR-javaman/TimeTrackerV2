export const fetchEmployees = async (jwt) => {
    const response = await fetch('http://localhost:8081/api/employees', {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });

    if (!response.ok) {
        throw new Error('Ошибка при загрузке данных сотрудников');
    }

    return await response.json();
};
