import React from 'react';

const Modal = ({ isActive, message, title, status, disableModal }) => {
    if (isActive) {
        return (
            <div
                className="modal open z-depth-5"
                style={{
                    zIndex: '1003',
                    display: 'block',
                    opacity: '1',
                    top: '30%',
                    transform: 'scaleX(1), scaleY(1)',
                }}
            >
                <div className="modal-content">
                    <h2 className={status ? 'pollitic-modal-success' : 'pollitic-modal-warn'}>
                        {title}
                    </h2>
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button
                        onClick={disableModal}
                        className="modal-close waves-effect waves-green btn-flat poll-btn"
                    >
                        თანხმობა
                    </button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Modal;
