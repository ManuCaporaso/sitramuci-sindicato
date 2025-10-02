import React, { useState, useEffect } from "react";
import axios from "axios";

const AfiliadoForm = ({ editable, onSaved }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    estado_civil: "",
    fecha_nacimiento: "",
    domicilio: "",
    localidad: "",
    provincia: "",
    codigo_postal: "",
    email: "",
    telefono: "",
    profesion: "",
    sector: "",
    rubro: "",
    categoria: "",
    legajo: "",
    domicilio_laboral: "",
    fecha_ingreso: "",
  });

  useEffect(() => {
    if (editable) setFormData(editable);
  }, [editable]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editable) {
        await axios.put(
          `http://localhost:4000/api/afiliados/${editable.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:4000/api/afiliados", formData);
      }
      // reset
      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        estado_civil: "",
        fecha_nacimiento: "",
        domicilio: "",
        localidad: "",
        provincia: "",
        codigo_postal: "",
        email: "",
        telefono: "",
        profesion: "",
        sector: "",
        rubro: "",
        categoria: "",
        legajo: "",
        domicilio_laboral: "",
        fecha_ingreso: "",
      });
      onSaved();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{editable ? "Editar Afiliado" : "Agregar Afiliado"}</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field} style={{ marginBottom: "8px" }}>
            <label style={{ textTransform: "capitalize" }}>{field.replace(/_/g, " ")}:</label>
            <input
              name={field}
              placeholder={field.replace(/_/g, " ")}
              value={formData[field]}
              onChange={handleChange}
              required={["nombre","apellido","dni"].includes(field)} // campos obligatorios
            />
          </div>
        ))}
        <button type="submit">{editable ? "Actualizar" : "Agregar"}</button>
      </form>
    </div>
  );
};

export default AfiliadoForm;
