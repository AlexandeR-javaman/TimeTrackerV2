import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const HomePage = () => {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Загрузка...</div>; // ждем инициализации
    }

    if (!keycloak.authenticated) {
        return (
            <div>
                <h1>Добро пожаловать!</h1>
                <button onClick={() => keycloak.login()}>Войти</button>
            </div>
        );
    }

    // пользователь авторизован, можно дальше рендерить
    return <div>Вы вошли в систему</div>;
};

export default HomePage;
