import React, { useState } from "react";
import AfiliadoForm from "../components/AfiliadoForm";
import "../Styles/AfiliadosFormPage.css"; // Asegurate de crear este archivo

const AfiliadosFormPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="afiliados-form-page">
      <div className="logo-container">
        <img
          src="/logositramuci.png" // Colocá la ruta correcta de tu logo
          alt="Logo Sindicato"
          className="sindicato-logo"
        />
      </div>
      <h1>Nuevo Afiliado</h1>
      <div className="form-container">
        <AfiliadoForm
          onSaved={() => {
            setRefresh(!refresh);
          }}
        />
      </div>
    </div>
  );
};

export default AfiliadosFormPage;
