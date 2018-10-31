import React from 'react';

const Modal = ({isActive, message, title, status, disableModal}) => {
    const view = isActive ? (
        <div className="modal open" style={{zIndex: '1003', display: 'block', opacity: '1', top: '10%', transform: 'scaleX(1), scaleY(1)'}}>
            <div className="modal-content">
                <h2 className={status ? 'pollitic-modal-success' : 'pollitic-modal-warn'}>{title}</h2>
                <p>{message}</p>
            </div>
            <div className="modal-footer">
                <button onClick={disableModal} className="modal-close waves-effect waves-green btn-flat">თანხმობა</button>
            </div>
        </div>        
    ) : null;
    
    return (
        <React.Fragment>
            {view}
        </React.Fragment>
    );
}

export default Modal;