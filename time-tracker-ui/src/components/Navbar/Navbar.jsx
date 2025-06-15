import AdminNavbar from './AdminNavbar';
import EmployeeNavbar from './EmployeeNavbar';

const Navbar = ({ role, username, onLogout }) => {
    return (
        <nav className="navbar">
            <span className="navbar-user">👤 {username} ({role})</span>
            <div className="navbar-links">
                {role === 'Admin' && <AdminNavbar/>}
                {role === 'Employee' && <EmployeeNavbar/>}
            </div>
            <button className="navbar-logout" onClick={onLogout}>Выход</button>
        </nav>
    );
};

export default Navbar;
