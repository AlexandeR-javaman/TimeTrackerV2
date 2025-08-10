import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import buttonStyles from '../components/StartEndButton/ButtonStyles.module.css';

const HomePage = () => {
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();

    const handleLogin = () => {
        keycloak.login(); // Инициируем вход только по нажатию кнопки
    };

    React.useEffect(() => {
        if (initialized && keycloak.authenticated) {
            if (keycloak.hasRealmRole('ADMIN')) {
                navigate('/admin');
            } else if (keycloak.hasRealmRole('USER')) {
                navigate('/employee');
            }else {
                navigate('/access-denied'); // путь к AccessDeniedPage
            }
        }
    }, [keycloak, navigate, initialized]);

    if (!initialized) {
        return <div>Загрузка страницы...</div>;
    }

    // React.useEffect(() => {
    //     if (initialized && keycloak.authenticated) {
    //         if (keycloak.hasRealmRole('ADMIN')) {
    //             navigate('/admin');
    //         } else {
    //             navigate('/employee');
    //         }
    //     }
    // }, [keycloak, navigate, initialized]);
    //
    // if (!initialized) {
    //     return <div>Загрузка...</div>;
    // }

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Добро пожаловать в систему учета рабочего времени!</h1>
            <button
                className={buttonStyles.logButton}
                onClick={handleLogin}>Войти</button>
        </div>
    );
};
//     return (
//     <div style={{ textAlign: 'center', marginTop: '100px' }}>
//         <h1>Добро пожаловать в систему учета</h1>
//         <div style={{ marginTop: '30px' }}>
//             <Link to="/employee" style={{ fontSize: 24, marginRight: '40px' }}>Перейти на страницу работника</Link>
//             <Link to="/admin" style={{ fontSize: 24 }}>Перейти на страницу администратора</Link>
//         </div>
//     </div>
// );

export default HomePage;