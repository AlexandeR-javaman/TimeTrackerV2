import React, { useEffect, useState, forwardRef } from 'react';

const CustomTable = forwardRef(({ columns, loadData }, ref) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await loadData();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [loadData]);

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <table ref={ref}>
            <thead>
            <tr>
                {columns.map(col => (
                    <th key={col.key} style={{ width: col.width || 'auto' }}>
                        {col.label}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {columns.map(col => (
                        <td key={col.key}>{item[col.key]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
});

export default CustomTable;
