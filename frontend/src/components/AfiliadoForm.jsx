import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AfiliadoForm = ({ editable = null, onSaved, onClose }) => {
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
    activo: true,
    legajo: "",
    domicilio_laboral: "",
    fecha_ingreso: "",
  });

  useEffect(() => {
    if (editable) {
      setFormData({
        ...editable,
        activo: editable.activo === 1 || editable.activo === true,
        dni: editable.dni?.toString() || "",
        telefono: editable.telefono?.toString() || "",
        codigo_postal: editable.codigo_postal?.toString() || "",
        legajo: editable.legajo?.toString() || "",
      });
    }
  }, [editable]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Campos numéricos: solo números
    if (["dni", "telefono", "codigo_postal", "legajo"].includes(name)) {
      if (value === "" || /^[0-9\b]+$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Checkbox
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    // Campos de texto/email/fecha
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("❌ Email inválido", { icon: "⚠️" });
      return;
    }

    try {
      const payload = {
        nombre: formData.nombre || null,
        apellido: formData.apellido || null,
        dni: formData.dni ? parseInt(formData.dni, 10) : null,
        estado_civil: formData.estado_civil || null,
        fecha_nacimiento: formData.fecha_nacimiento || null,
        domicilio: formData.domicilio || null,
        localidad: formData.localidad || null,
        provincia: formData.provincia || null,
        codigo_postal: formData.codigo_postal
          ? parseInt(formData.codigo_postal, 10)
          : null,
        email: formData.email || null,
        telefono: formData.telefono ? parseInt(formData.telefono, 10) : null,
        profesion: formData.profesion || null,
        sector: formData.sector || null,
        rubro: formData.rubro || null,
        categoria: formData.categoria || null,
        legajo: formData.legajo ? parseInt(formData.legajo, 10) : null,
        domicilio_laboral: formData.domicilio_laboral || null,
        fecha_ingreso: formData.fecha_ingreso || null,
        activo: !!formData.activo,
      };

      if (editable) {
        await axios.put(
          `http://localhost:4000/api/afiliados/${editable.id}`,
          payload
        );
        toast.success("✅ Afiliado actualizado correctamente!", { icon: "📝" });
      } else {
        await axios.post("http://localhost:4000/api/afiliados", payload);
        toast.success("🎉 Afiliado creado correctamente!", { icon: "🎯" });
      }

      if (onSaved) onSaved();

      // Resetear formulario
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
        activo: true,
        legajo: "",
        domicilio_laboral: "",
        fecha_ingreso: "",
      });
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "❌ Error al guardar el afiliado";
      toast.error(msg, { icon: "⚠️" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div><label>Nombre:</label><input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required /></div>
        <div><label>Apellido:</label><input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required /></div>
        <div><label>DNI:</label><input type="text" name="dni" value={formData.dni} onChange={handleChange} required placeholder="Solo números" /></div>
        <div><label>Estado Civil:</label><input type="text" name="estado_civil" value={formData.estado_civil} onChange={handleChange} /></div>
        <div><label>Fecha de Nacimiento:</label><input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} /></div>
        <div><label>Domicilio:</label><input type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} /></div>
        <div><label>Localidad:</label><input type="text" name="localidad" value={formData.localidad} onChange={handleChange} /></div>
        <div><label>Provincia:</label><input type="text" name="provincia" value={formData.provincia} onChange={handleChange} /></div>
        <div><label>Código Postal:</label><input type="text" name="codigo_postal" value={formData.codigo_postal} onChange={handleChange} placeholder="Solo números" /></div>
        <div><label>Email:</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ejemplo@dominio.com" /></div>
        <div><label>Teléfono:</label><input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Solo números" /></div>
        <div><label>Profesión:</label><input type="text" name="profesion" value={formData.profesion} onChange={handleChange} /></div>
        <div><label>Sector:</label><input type="text" name="sector" value={formData.sector} onChange={handleChange} /></div>
        <div><label>Rubro:</label><input type="text" name="rubro" value={formData.rubro} onChange={handleChange} /></div>
        <div><label>Categoría:</label><input type="text" name="categoria" value={formData.categoria} onChange={handleChange} /></div>
        <div><label>Legajo:</label><input type="text" name="legajo" value={formData.legajo} onChange={handleChange} required placeholder="Solo números positivos" /></div>
        <div><label>Domicilio Laboral:</label><input type="text" name="domicilio_laboral" value={formData.domicilio_laboral} onChange={handleChange} /></div>
        <div><label>Fecha de Ingreso:</label><input type="date" name="fecha_ingreso" value={formData.fecha_ingreso} onChange={handleChange} /></div>
        <div><label>Activo:</label><input type="checkbox" name="activo" checked={formData.activo} onChange={handleChange} /></div>

        <button type="submit">{editable ? "Actualizar" : "Crear"} Afiliado</button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="colored"
      />
    </>
  );
};

export default AfiliadoForm;
