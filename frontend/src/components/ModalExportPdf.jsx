// src/components/Modal.jsx
import React from "react";
import "../Styles/ModalExportPdf.css"; // opcional para estilos

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // evitar que se cierre al click dentro
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
