import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './style.css';
import { AdminLayout } from './components/layouts/AdminLayout';
import { EmployeeLayout } from './components/layouts/EmployeeLayout';

// Admin pages
import AdminPageStart from "./pages/AdminPages/AdminPageStart";
import AdminPageListOfEmployees from "./pages/AdminPages/AdminPageListOfEmployees";
import AdminPageListOfEntries from "./pages/AdminPages/AdminPageListOfEntries";
import AdminPageAddEmployee from "./pages/AdminPages/AdminPageAddEmployee";

// Employee pages
import EmployeePageStart from "./pages/EmployeePages/EmployeePageStart";
import EmployeePageListOfEntries from "./pages/EmployeePages/EmployeePageListOfEntries";
import EmployeePageStartTime from "./pages/EmployeePages/EmployeePageStartTime";
import EmployeePageEndTime from "./pages/EmployeePages/EmployeePageEndTime";

function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />

            {/* Admin routes */}
            <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminPageStart />} />
                <Route path="/admin/employees" element={<AdminPageListOfEmployees />} />
                <Route path="/admin/logentry" element={<AdminPageListOfEntries />} />
                <Route path="/admin/addemployee" element={<AdminPageAddEmployee />} />
            </Route>

            {/* Employee routes */}
            <Route element={<EmployeeLayout />}>
                <Route path="/employee" element={<EmployeePageStart />} />
                <Route path="/employee/logentry" element={<EmployeePageListOfEntries />} />
                <Route path="/employee/startTime" element={<EmployeePageStartTime />} />
                <Route path="/employee/endTime" element={<EmployeePageEndTime />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
    );
}

export default App;