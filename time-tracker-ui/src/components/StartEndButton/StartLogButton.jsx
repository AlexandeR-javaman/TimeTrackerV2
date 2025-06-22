import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StartLogButton = ({ employeeId, onLogStarted }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [logEntryId, setLogEntryId] = useState(null);

    const handleStartLog = async () => {
        if (!employeeId) {
            setError('Не указан идентификатор сотрудника');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);
        setLogEntryId(null);

        try {
            const API_URL = process.env.REACT_APP_API_GATEWAY_BASE_URL; //http://localhost:8080/log_entry_service/api/log_entries
            const LOG_ENTRY_PATH = process.env.REACT_APP_LOG_ENTRY_PATH;//http://localhost:8082
            const response = await fetch(`${API_URL}${LOG_ENTRY_PATH}/api/log_entries/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ employeeId }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Обработка конфликта (409)
                if (response.status === 409) {
                    throw new Error(data.message || 'У вас уже есть незавершенная смена');
                }
                // Обработка других ошибок
                throw new Error(data.message || `Ошибка сервера: ${response.status}`);
            }

            // Успешное создание (201 Created)
            if (response.status === 201) {
                const newLogEntryId = data.logEntryId;
                setLogEntryId(newLogEntryId);
                setSuccess(`Смена успешно начата! ID: ${newLogEntryId}`);

                // Вызываем колбэк, если он передан
                if (onLogStarted) {
                    onLogStarted(newLogEntryId);
                }
            }

        } catch (error) {
            console.error('Ошибка при старте смены:', error);
            setError(error.message);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="start-log-container">
            <button
                onClick={handleStartLog}
                disabled={isLoading || !employeeId}
                className={`start-log-button ${isLoading ? 'loading' : ''}`}
            >
                {isLoading ? 'Запуск смены...' : 'Начать смену'}
            </button>

            {success && (
                <div className="success-message">
                    ✅ {success}
                    {logEntryId && (
                        <div className="log-entry-info">
                            Номер смены: <strong>{logEntryId}</strong>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="error-message">
                    ❌ {error}
                    {error.includes('незавершенная смена') && (
                        <div className="error-hint">
                            Пожалуйста, завершите текущую смену перед началом новой
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

StartLogButton.propTypes = {
    employeeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onLogStarted: PropTypes.func
};

export default StartLogButton;