import React from "react";


const Modal = ({ show, onClose, title, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-comp">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="modal-close-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
