import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './style.css';
import ProtectedApp from './ProtectedApp';
import AccessDeniedPage from './pages/AccessDeniedPage';
import PageNotFound from './pages/PageNotFound';

function App() {
    return (
        <Routes>
            {/* Публичные страницы */}
            <Route path="/" element={<HomePage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />

            {/* Защищённая часть приложения */}
            <Route path="/*" element={<ProtectedApp />} />

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default App;
