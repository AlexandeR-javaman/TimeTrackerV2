import React from 'react';
import Portal from './Portal';
import './ConfirmModal.css';

const ConfirmModal = ({
                          isOpen,
                          onClose,
                          onConfirm,
                          title = "Подтверждение действия",
                          message = "Вы уверены, что хотите выполнить это действие?",
                          confirmText = "Да",
                          cancelText = "Отмена"
                      }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Portal>
            <div className="confirm-overlay" onClick={onClose}>
                <div className="confirm-modal" onClick={e => e.stopPropagation()}>
                    <div className="confirm-header">
                        <h4>{title}</h4>
                    </div>
                    <div className="confirm-body">
                        <p>{message}</p>
                    </div>
                    <div className="confirm-actions">
                        <button onClick={onClose} className="confirm-cancel">
                            {cancelText}
                        </button>
                        <button onClick={handleConfirm} className="confirm-ok">
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default ConfirmModal;