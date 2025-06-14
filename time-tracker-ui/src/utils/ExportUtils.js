// utils/exportUtils.js
export function exportTableToCSV(filename) {
    const rows = Array.from(document.querySelectorAll('table tr'));
    const csvContent = rows.map(row =>
        Array.from(row.querySelectorAll('th, td'))
            .map(cell => {
                const text = cell.textContent.replace(/"/g, '""');
                return `"${text}"`;
            })
            .join(';')
    ).join('\n');

    const bom = '\uFEFF';
    const fullContent = bom + csvContent;
    const blob = new Blob([fullContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}