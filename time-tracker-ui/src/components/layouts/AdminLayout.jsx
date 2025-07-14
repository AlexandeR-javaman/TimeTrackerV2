import React from 'react';
import { Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { PrivateRoute } from '../../PrivateRoute';

export const AdminLayout = () => {
    const { initialized } = useKeycloak();

    if (!initialized) {
        return <div>Проверка авторизации...</div>;
    }

    return (
        <PrivateRoute roles={['ADMIN']}>
            <Outlet />
        </PrivateRoute>
    );
};