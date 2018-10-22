import React from 'react';

const Modal = ({modal, changeModalStatus}) => {
    return modal.display ? (
        <div className="modal open" style={{zIndex: '1003', display: 'block', opacity: '1', top: '10%', transform: 'scaleX(1), scaleY(1)'}}>
            <div className="modal-content">
                <h5>{modal.status ? 'ხმის მიცემა დასრულებულია' : 'დაფიქსირდა შეცდომა'}</h5>
                <p>{modal.message}</p>
            </div>
            <div className="modal-footer">
                <button onClick={changeModalStatus} className="modal-close waves-effect waves-green btn-flat">თანხმობა</button>
            </div>
        </div>
    ) : false;
}

export default Modal; 