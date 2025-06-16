import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployeePageListOfEntries from './pages/EmployeePages/EmployeePageListOfEntries';
import './style.css';
import AdminPageStart from "./pages/AdminPages/AdminPageStart";
import AdminPageListOfEmployees from "./pages/AdminPages/AdminPageListOfEmployees";
import AdminPageListOfEntries from "./pages/AdminPages/AdminPageListOfEntries";
import EmployeePageStart from "./pages/EmployeePages/EmployeePageStart";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/employee" element={<EmployeePageStart />} />
                <Route path="/employee/logentry" element={<EmployeePageListOfEntries />} />
                <Route path="/admin" element={<AdminPageStart />} />
                <Route path="/admin/employees" element={<AdminPageListOfEmployees />} />
                <Route path="/admin/logentry" element={<AdminPageListOfEntries />} />
            </Routes>
        </Router>
    );
}

export default App;