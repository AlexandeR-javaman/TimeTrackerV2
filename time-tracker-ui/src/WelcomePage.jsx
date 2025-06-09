import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
    const [randomNumber, setRandomNumber] = useState(null);
    const [generationTime, setGenerationTime] = useState('');

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * 101));
        const now = new Date();
        const timeString = now.toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        setGenerationTime(timeString);
    }, []);

    return (
        <div>
            <h1>Добро пожаловать на страницу приложения со списком сотрудников</h1>
            <p style={{ fontSize: 32 }}>
                Случайное число для теста: <span>{randomNumber}</span>
            </p>
            <p style={{ fontSize: 24 }}>
                Страница сгенерирована: <span>{generationTime}</span>
            </p>

            <p>
                <Link to="/employees" style={{ fontSize: 20 }}>
                    Перейти к списку сотрудников
                </Link>
            </p>
            <p>
                <a href="http://localhost:8081/swagger-ui/index.html" style={{ fontSize: 20 }} target="_blank" rel="noopener noreferrer">
                    Перейти к Сваггеру
                </a>
            </p>
        </div>
    );
}