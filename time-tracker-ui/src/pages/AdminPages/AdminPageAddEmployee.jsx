import React, {useRef} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import EmployeeRegistrationForm from "../../api/addEmployeeButton";

const AdminPageStart = () => {
    // const [role, setRole] = useState('');
    // const [username, setUsername] = useState('');
    // const role = 'Admin';
    // const username = 'Иван Петров';
    const jwt = localStorage.getItem('token'); // или получить из контекста
    const tableRef = useRef(null); // Создаем ref для таблицы

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    // useEffect(() => {
    //     if (keycloak.authenticated) {
    //         const roles = keycloak.tokenParsed?.realm_access?.roles || [];
    //         const firstRole = roles[3] || '';
    //         setRole(firstRole);
    //
    //         const preferredUsername = keycloak.tokenParsed?.preferred_username || '';
    //         const fullName = keycloak.tokenParsed?.name || preferredUsername;
    //         setUsername(fullName);
    //     }
    // }, []);

    return (
        <>
            <Navbar/>
            {/*<Navbar role={role} username={username} onLogout={handleLogout}/>*/}
            <div className="App">
                <EmployeeRegistrationForm/>
            </div>
        </>
    );
};

export default AdminPageStart;
