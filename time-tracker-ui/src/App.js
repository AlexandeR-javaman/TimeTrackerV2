import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import EmployeesPage from './EmployeesPage';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/employees" element={<EmployeesPage />} />
        </Routes>
      </BrowserRouter>
  );
}