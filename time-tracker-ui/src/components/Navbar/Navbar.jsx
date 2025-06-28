import AdminNavbar from './AdminNavbar';
import EmployeeNavbar from './EmployeeNavbar';
import NavButton from './NavButton';
import React from "react";
import keycloak from '../../keycloak';

const Navbar = ({ role, username, onLogout }) => {
    const rolePaths = {
        Admin: '/admin',
        User: '/employee'
    };
    const profilePath = rolePaths[role] || '/';
    const roleIcons = {
        Admin: '👑',
        User: '👤',
        Manager: '💼'
    };
    const icon = roleIcons[role] || '🔹';
    // const navigate = useNavigate();
    // const handleLogout = () => {
    //     // 1. Удаляем токен из localStorage
    //     localStorage.removeItem('jwtToken');
    //     // 2. Опционально: очищаем другие данные
    //     localStorage.removeItem('userData');
    //     // 3. Перенаправляем на страницу входа
    //     navigate('/');
    //     // 4. Можно обновить страницу, чтобы сбросить состояние
    //     window.location.reload(); // Если нужно
    // };
    const handleLogout = () => {
        keycloak.logout({
            redirectUri: window.location.origin
        });
    };

    return (
        <nav className="navbar">
            <NavButton path={profilePath} label={`${icon} ${username} (${role})`} />
            <div className="navbar-links">
                {role === 'Admin' && <AdminNavbar/>}
                {role === 'User' && <EmployeeNavbar/>}
            </div>
            <button className="navbar-logout" onClick={handleLogout}>Выход</button>
        </nav>
    );
};

export default Navbar;
