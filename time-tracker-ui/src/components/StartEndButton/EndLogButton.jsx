import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EndLogButton = ({ employeeId, onLogEnded }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [reportMessage, setReportMessage] = useState('');
    const [charCount, setCharCount] = useState(0);

    const handleEndLog = async () => {
        if (!employeeId) {
            setError('Не указан идентификатор сотрудника');
            return;
        }

        if (!reportMessage.trim()) {
            setError('Пожалуйста, заполните отчет о смене');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const API_URL = process.env.REACT_APP_API_GATEWAY_BASE_URL; //http://localhost:8080/log_entry_service/api/log_entries
            const LOG_ENTRY_PATH = process.env.REACT_APP_LOG_ENTRY_PATH;//http://localhost:8082
            const response = await fetch(`${API_URL}${LOG_ENTRY_PATH}/api/log_entries/end`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employeeId: employeeId,
                    message: reportMessage
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Обработка ошибки 404 - нет начатых смен
                if (response.status === 404) {
                    throw new Error(data.message || 'У вас нет начатых смен');
                }
                // Обработка других ошибок
                throw new Error(data.message || `Ошибка сервера: ${response.status}`);
            }

            // Успешное завершение (200 OK или 204 No Content)
            setSuccess(data.message || 'Смена успешно завершена!');
            setReportMessage(''); // Очищаем поле сообщения

            // Вызываем колбэк, если он передан
            // if (onLogEnded) {
            //     onLogEnded();
            // }

        } catch (error) {
            console.error('Ошибка при завершении смены:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMessageChange = (e) => {
        const value = e.target.value;
        if (value.length <= 255) {
            setReportMessage(value);
            setCharCount(value.length);
        }
    };

    return (
        <div className="end-log-container">
            <div className="report-input-container">
                <label htmlFor="report-message">Отчет о смене:</label>
                <textarea
                    id="report-message"
                    value={reportMessage}
                    onChange={handleMessageChange}
                    placeholder="Опишите результаты работы за смену (макс. 255 символов)"
                    rows={4}
                    maxLength={255}
                />
                <div className="char-counter">{charCount}/255</div>
            </div>

            <button
                onClick={handleEndLog}
                disabled={isLoading || !employeeId}
                // с обязательным сообщением при завершении
                // disabled={isLoading || !employeeId || !reportMessage.trim()}
                className={`end-log-button ${isLoading ? 'loading' : ''}`}
            >
                {isLoading ? 'Завершение смены...' : 'Завершить смену'}
            </button>

            {success && (
                <div className="success-message">
                    ✅ {success}
                </div>
            )}

            {error && (
                <div className="error-message">
                    ❌ {error}
                    {error.includes('нет начатых смен') && (
                        <div className="error-hint">
                            Пожалуйста, начните смену перед попыткой завершения
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

EndLogButton.propTypes = {
    employeeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onLogEnded: PropTypes.func
};

export default EndLogButton;