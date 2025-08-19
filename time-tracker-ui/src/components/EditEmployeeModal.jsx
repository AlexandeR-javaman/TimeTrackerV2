import React, { useState, useEffect } from 'react';
import Portal from './Portal';
import ConfirmModal from './ConfirmModal';
import './EditEmployeeModal.css';

const EditEmployeeModal = ({
                               isOpen,
                               onClose,
                               employee,
                               onSave
                           }) => {
    const [formData, setFormData] = useState({
        surname: '',
        name: '',
        patronymic: '',
        stuffId: '',
        employeePost: ''
    });

    const [showConfirm, setShowConfirm] = useState(false);

    // Эффект для блокировки прокрутки body при открытом модальном окне
    useEffect(() => {
        if (isOpen) {
            // Сохраняем текущее положение прокрутки
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            return () => {
                // Восстанавливаем прокрутку при закрытии
                const scrollY = parseInt(document.body.style.top || '0');
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, Math.abs(scrollY));
            };
        }
    }, [isOpen]);

    // Заполняем форму данными сотрудника при открытии
    useEffect(() => {
        if (employee && isOpen) {
            setFormData({
                surname: employee.surname || '',
                name: employee.name || '',
                patronymic: employee.patronymic || '',
                stuffId: employee.stuffId || '',
                employeePost: employee.employeePost || ''
            });
        }
    }, [employee, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // проверка внесения изменений:
    const hasChanges = () => {
        if (!employee) return false;

        return (
            formData.surname !== employee.surname ||
            formData.name !== employee.name ||
            formData.patronymic !== employee.patronymic ||
            formData.stuffId !== employee.stuffId ||
            formData.employeePost !== employee.employeePost
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!hasChanges()) {
            alert('Изменения не обнаружены');
            return;
        }

        setShowConfirm(true);
    };

    const handleConfirmSave = () => {
        console.log('Сохраняем данные:', formData);
        onSave(employee.id, formData);
        setShowConfirm(false);
    };

    const handleCancelConfirm = () => {
        setShowConfirm(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
        <Portal>
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Редактирование сотрудника
                            <br/>
                            <span>
                            {employee ?
                                `${employee.surname} ${employee.name ? employee.name[0] + '.' : ''} 
                                ${employee.patronymic ? employee.patronymic[0] + '.' : ''}`
                                :''
                            }
  </span>
                        </h3>
                        <button className="modal-close" onClick={onClose}>×</button>
                    </div>

                    {employee ? (
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group">
                                <label>Фамилия:</label>
                                <input
                                    type="text"
                                    name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Имя:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Отчество:</label>
                            <input
                                type="text"
                                name="patronymic"
                                value={formData.patronymic}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Табельный номер:</label>
                            <input
                                type="text"
                                name="stuffId"
                                value={formData.stuffId}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Должность:</label>
                            <input
                                type="text"
                                name="employeePost"
                                value={formData.employeePost}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="modal-actions">
                            <button type="button" onClick={onClose} className="cancel-button">
                                Отмена
                            </button>
                            <button type="submit" className="save-button">
                                Сохранить
                            </button>
                        </div>
                    </form>
                    ) : (
                        <div>Загрузка данных...</div>
                    )}
                </div>
            </div>
        </Portal>

    // Окно подтверждения
            <ConfirmModal
                isOpen={showConfirm}
                onClose={handleCancelConfirm}
                onConfirm={handleConfirmSave}
                title="Подтверждение сохранения"
                message="Вы уверены, что хотите сохранить изменения данных сотрудника?"
                confirmText="Сохранить"
                cancelText="Отмена"
            />
        </>
    );
};

export default EditEmployeeModal;