import { Routes, Route, Navigate } from 'react-router-dom';
import StartPage from '../pages/StarPage';
import EmployeePage from '../pages/EmployeePage';
import AdminPage from '../pages/AdminPage';
import { useAuth } from '../context/AuthContext';

const AppRouter = () => {
  const { user } = useAuth();

  if (!user) return <StarPage />;

  return (
    <Routes>
      {user.role === 'employee' && (
        <Route path="/employee" element={<EmployeePage />} />
      )}
      {user.role === 'admin' && (
        <Route path="/admin" element={<AdminPage />} />
      )}
      <Route path="*" element={<Navigate to={`/${user.role}`} />} />
    </Routes>
  );
};

export default AppRouter;