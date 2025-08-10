import React, { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import buttonStyles from '../components/StartEndButton/ButtonStyles.module.css';

const HomePage = () => {
    const { keycloak } = useKeycloak();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = () => {
        setLoading(true);
        setError(null);

        keycloak.login()
            .catch(() => {
                setError('Невозможно подключиться к серверу аутентификации');
                setLoading(false);
            });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Добро пожаловать в систему учета рабочего времени!</h1>
            {loading ? (
                <p>Вход...</p>
            ) : (
                <button className={buttonStyles.logButton} onClick={handleLogin}>
                    Войти
                </button>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default HomePage;
