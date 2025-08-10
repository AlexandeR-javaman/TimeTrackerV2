import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import createKeycloak from './keycloak';

const keycloak = createKeycloak();

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
            console.log('Keycloak event:', event);
            if (error) {
                console.warn('Keycloak event error:', error);
            }
        }}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReactKeycloakProvider>
);


// import React, { useEffect, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { ReactKeycloakProvider } from '@react-keycloak/web';
// import createKeycloak from './keycloak';
// import { fakeKeycloak } from './fakeKeycloak';
//
// const container = document.getElementById('root');
// const root = createRoot(container);
//
// async function fetchWithTimeout(url, options = {}, timeout = 2000) {
//     return Promise.race([
//         fetch(url, options),
//         new Promise((_, reject) =>
//             setTimeout(() => reject(new Error('timeout')), timeout)
//         ),
//     ]);
// }
//
// const RootApp = () => {
//     const [kcClient, setKcClient] = React.useState(null);
//
//     React.useEffect(() => {
//         async function checkKeycloak() {
//             try {
//                 await fetch(process.env.REACT_APP_KEYCLOAK_URL, { method: 'HEAD' });
//                 setKcClient(createKeycloak());
//             } catch {
//                 console.warn('Keycloak недоступен, работаем без авторизации');
//                 setKcClient(fakeKeycloak);
//             }
//         }
//         checkKeycloak();
//     }, []);
//
//     if (!kcClient) return null;
//
//     return (
//         <ReactKeycloakProvider authClient={kcClient} initOptions={{ onLoad: 'check-sso', checkLoginIframe: false }}>
//             <BrowserRouter>
//                 <App />
//             </BrowserRouter>
//         </ReactKeycloakProvider>
//     );
// };
//
// root.render(<RootApp />);




// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { ReactKeycloakProvider } from '@react-keycloak/web';
// import keycloak from './keycloak';
//
// const container = document.getElementById('root');
// const root = createRoot(container);
//
//
// root.render(
//     <ReactKeycloakProvider
//         authClient={keycloak}
//         initOptions={{
//             onLoad: 'check-sso',
//             checkLoginIframe: false,
//         }}
//         onEvent={(event, error) => {
//             if (event === 'onAuthSuccess') {
//                 console.log('Успешная авторизация!');
//             }
//         }}
//     >
//         <BrowserRouter
//             future={{
//                 v7_startTransition: true,
//                 v7_relativeSplatPath: true
//             }}
//         >
//             <App />
//         </BrowserRouter>
//     </ReactKeycloakProvider>
// );