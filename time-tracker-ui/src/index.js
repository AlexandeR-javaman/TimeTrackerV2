import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
            onLoad: 'check-sso',
            checkLoginIframe: false,
        }}
        onEvent={(event, error) => {
            if (event === 'onAuthSuccess') {
                console.log('Успешная авторизация!');
            }
        }}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReactKeycloakProvider>
);