import AdminNavbar from './AdminNavbar';
import EmployeeNavbar from './EmployeeNavbar';
import NavButton from './NavButton';
import React, {useEffect, useState} from "react";
import keycloak from '../../keycloak';

const Navbar = () => {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (keycloak.authenticated) {
            const roles = keycloak.tokenParsed?.realm_access?.roles || [];
            const firstRole = roles[1] || '';
            setRole(firstRole);

            const preferredUsername = keycloak.tokenParsed?.preferred_username || '';
            const fullName = keycloak.tokenParsed?.name || preferredUsername;
            setUsername(fullName);
        }
    }, []);

    const rolePaths = {
        Admin: '/admin',
        User: '/employee'
    };
    const profilePath = rolePaths[role] || '/';
    const roleIcons = {
        ADMIN: '👑',
        USER: '👤',
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
                {role === 'ADMIN' && <AdminNavbar/>}
                {role === 'USER' && <EmployeeNavbar/>}
            </div>
            <button className="navbar-logout" onClick={handleLogout}>Выход</button>
        </nav>
    );
};

export default Navbar;
