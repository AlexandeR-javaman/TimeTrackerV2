import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { ProtectedLayout } from './components/layouts/ProtectedLayout';

import AdminPageStart from './pages/AdminPages/AdminPageStart';
import AdminPageListOfEmployees from './pages/AdminPages/AdminPageListOfEmployees';
import AdminPageListOfEntries from './pages/AdminPages/AdminPageListOfEntries';
import AdminPageAddEmployee from './pages/AdminPages/AdminPageAddEmployee';

import EmployeePageStart from './pages/EmployeePages/EmployeePageStart';
import EmployeePageListOfEntries from './pages/EmployeePages/EmployeePageListOfEntries';
import EmployeePageStartTime from './pages/EmployeePages/EmployeePageStartTime';
import EmployeePageEndTime from './pages/EmployeePages/EmployeePageEndTime';

function ProtectedApp() {
    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={{
                onLoad: 'check-sso',
                checkLoginIframe: false,
                pkceMethod: 'S256'
            }}
        >
            <Routes>
                {/* ADMIN */}
                <Route element={<ProtectedLayout roles={['ADMIN']} />}>
                    <Route path="admin" element={<AdminPageStart />} />
                    <Route path="admin/employees" element={<AdminPageListOfEmployees />} />
                    <Route path="admin/logentry" element={<AdminPageListOfEntries />} />
                    <Route path="admin/addemployee" element={<AdminPageAddEmployee />} />
                </Route>

                {/* USER */}
                <Route element={<ProtectedLayout roles={['USER']} />}>
                    <Route path="employee" element={<EmployeePageStart />} />
                    <Route path="employee/logentry" element={<EmployeePageListOfEntries />} />
                    <Route path="employee/startTime" element={<EmployeePageStartTime />} />
                    <Route path="employee/endTime" element={<EmployeePageEndTime />} />
                </Route>
            </Routes>
        </ReactKeycloakProvider>
    );
}

export default ProtectedApp;
