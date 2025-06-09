import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Добро пожаловать в систему учета</h1>
        <div style={{ marginTop: '30px' }}>
            <Link to="/employee" style={{ fontSize: 24, marginRight: '40px' }}>Перейти на страницу работника</Link>
            <Link to="/admin" style={{ fontSize: 24 }}>Перейти на страницу администратора</Link>
        </div>
    </div>
);

export default Home;