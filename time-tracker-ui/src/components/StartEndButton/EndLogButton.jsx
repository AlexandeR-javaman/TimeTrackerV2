import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { endLogEntry } from '../../api/logEntriesApi';
import { useApiRequest } from '../../hooks/useApiRequest';

const EndLogButton = ({ onLogEnded }) => {
    const { isLoading, error, success, executeRequest, setError } = useApiRequest();
    const [reportMessage, setReportMessage] = useState('');
    const [charCount, setCharCount] = useState(0);

    const handleEndLog = async () => {
        if (!reportMessage.trim()) {
            setError('Пожалуйста, заполните отчет о смене');
            return;
        }

        try {
            const result = await executeRequest(() => endLogEntry(reportMessage));
            setReportMessage(''); // Очищаем поле после успеха

            if (onLogEnded) {
                onLogEnded(result);
            }
        } catch (error) {
            // Ошибка уже обработана в useApiRequest
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
                disabled={isLoading || !reportMessage.trim()}
                className={`end-log-button ${isLoading ? 'loading' : ''}`}
            >
                {isLoading ? 'Завершение смены...' : 'Завершить смену'}
            </button>

            {success && (
                <div className="success-message">
                    ✅ {success.message || 'Смена успешно завершена!'}
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
    onLogEnded: PropTypes.func
};

export default EndLogButton;