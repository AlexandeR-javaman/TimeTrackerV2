import AdminNavbar from './AdminNavbar';
import EmployeeNavbar from './EmployeeNavbar';
import NavButton from './NavButton';
import React, {useEffect, useState} from "react";
import keycloak from '../../keycloak';

const Navbar = () => {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (!keycloak.authenticated || !keycloak.tokenParsed) return;
        const roles = keycloak.tokenParsed?.realm_access?.roles || [];
        // Определяем роль вручную по приоритету
        let selectedRole = '';
        if (roles.includes('ADMIN')) {
            selectedRole = 'ADMIN';
        } else if (roles.includes('USER')) {
            selectedRole = 'USER';
        }
            // const firstRole = roles[1] || '';
        setRole(selectedRole);

        const preferredUsername = keycloak.tokenParsed?.preferred_username || '';
        const fullName = keycloak.tokenParsed?.name || preferredUsername;
        setUsername(fullName);

        console.log("Парсим токен для ID", keycloak.tokenParsed.sub);
    }, []);

    const rolePaths = {
        ADMIN: '/admin',
        USER: '/employee'
    };
    const profilePath = rolePaths[role] || '/';
    const roleIcons = {
        ADMIN: '👑',
        USER: '👤',
        MANAGER: '💼'
    };
    const icon = roleIcons[role] || '🔹';

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
