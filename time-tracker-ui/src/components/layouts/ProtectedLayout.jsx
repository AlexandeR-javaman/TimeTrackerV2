import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from '../../keycloak';
import KeycloakUnavailablePage from '../../pages/KeycloakUnavailablePage';

const AuthGuard = ({ roles }) => {
    const { keycloak, initialized } = useKeycloak();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!initialized) {
            const timer = setTimeout(() => {
                setError(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [initialized]);

    if (error) return <KeycloakUnavailablePage />;
    if (!initialized) return <div>Проверка авторизации...</div>;

    if (!keycloak.authenticated) return <Navigate to="/" />;

    const hasRole = roles.some(role => keycloak.hasRealmRole(role));
    if (!hasRole) return <Navigate to="/access-denied" />;

    return <Outlet />;
};

export const ProtectedLayout = ({ roles }) => {
    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={{
                onLoad: 'check-sso',
                checkLoginIframe: false,
                pkceMethod: 'S256'
            }}
            onEvent={(event, error) => {
                if (event === 'onAuthError') {
                    console.error('Keycloak недоступен', error);
                }
            }}
        >
            <AuthGuard roles={roles} />
        </ReactKeycloakProvider>
    );
};



// import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import { useKeycloak } from '@react-keycloak/web';
//
// export const ProtectedLayout = ({ roles }) => {
//     const { keycloak, initialized } = useKeycloak();
//
//     // Пока Keycloak инициализируется — только для защищённых страниц
//     if (!initialized) {
//         return <div>Проверка авторизации...</div>;
//     }
//
//     // Если не авторизован
//     if (!keycloak.authenticated) {
//         return <Navigate to="/" />;
//     }
//
//     // Проверка ролей
//     const hasRole = roles.some(role => keycloak.hasRealmRole(role));
//     if (!hasRole) {
//         return <Navigate to="/access-denied" />;
//     }
//
//     return <Outlet />;
// };
