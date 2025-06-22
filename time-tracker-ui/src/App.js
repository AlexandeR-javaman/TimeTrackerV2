import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployeePageListOfEntries from './pages/EmployeePages/EmployeePageListOfEntries';
import './style.css';
import AdminPageStart from "./pages/AdminPages/AdminPageStart";
import AdminPageListOfEmployees from "./pages/AdminPages/AdminPageListOfEmployees";
import AdminPageListOfEntries from "./pages/AdminPages/AdminPageListOfEntries";
import EmployeePageStart from "./pages/EmployeePages/EmployeePageStart";
import EmployeePageStartTime from "./pages/EmployeePages/EmployeePageStartTime";
import EmployeePageEndTime from "./pages/EmployeePages/EmployeePageEndTime";
import AdminPageAddEmployee from "./pages/AdminPages/AdminPageAddEmployee";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/employee" element={<EmployeePageStart />} />
                <Route path="/employee/logentry" element={<EmployeePageListOfEntries />} />
                <Route path="/employee/startTime" element={<EmployeePageStartTime />} />
                <Route path="/employee/endTime" element={<EmployeePageEndTime />} />
                <Route path="/admin" element={<AdminPageStart />} />
                <Route path="/admin/employees" element={<AdminPageListOfEmployees />} />
                <Route path="/admin/logentry" element={<AdminPageListOfEntries />} />
                <Route path="/admin/addemployee" element={<AdminPageAddEmployee />} />
            </Routes>
        </Router>
    );
}

export default App;