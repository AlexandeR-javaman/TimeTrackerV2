// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
//
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: 'login-required' }} // или 'check-sso' если не хочешь автологин
    >
        <App />
    </ReactKeycloakProvider>
);