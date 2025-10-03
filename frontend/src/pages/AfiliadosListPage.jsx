import React, { useState } from "react";
import AfiliadoList from "../components/AfiliadoList";
import AfiliadoForm from "../components/AfiliadoForm";
import Modal from "../components/Modal";
import "../Styles/AfiliadosListPage.css";
import api from "../utils/axiosConfig"; // Axios con token JWT

const AfiliadosListPage = () => {
  const [editable, setEditable] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Abrir modal con datos de afiliado editable
  const handleEdit = (afiliado) => {
    setEditable(afiliado);
    setShowModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setEditable(null);
    setShowModal(false);
  };

  return (
    <div className="afiliados-list-page">
      <div className="header">
        <div className="logo-container">
          <img
            src="/logositramuci.png"
            alt="Logo Sindicato"
            className="sindicato-logo"
          />
        </div>
        <h1>Listado de Afiliados SI.TRA.MU.CI</h1>
      </div>

      <div className="table-wrapper">
        <AfiliadoList
          key={refresh}
          onEdit={handleEdit}
          onDeleted={() => setRefresh(!refresh)}
          api={api} // Pasamos Axios con token JWT
        />
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <h2>Editar Afiliado</h2>
          <AfiliadoForm
            editable={editable}
            onSaved={() => {
              setRefresh(!refresh);
              handleCloseModal();
            }}
            api={api} // Pasamos Axios con token JWT
          />
        </Modal>
      )}
    </div>
  );
};

export default AfiliadosListPage;
