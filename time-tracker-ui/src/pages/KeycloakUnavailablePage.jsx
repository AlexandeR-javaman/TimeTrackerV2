import React from 'react';

const KeycloakUnavailablePage = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1>Сервис авторизации недоступен</h1>
            <p>
                Пожалуйста, попробуйте позже или свяжитесь с администратором.
            </p>
        </div>
    );
};

export default KeycloakUnavailablePage;
