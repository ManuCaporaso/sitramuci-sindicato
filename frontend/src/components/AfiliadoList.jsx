import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import AfiliadoForm from "./AfiliadoForm";
import ExportPDFButton from "./ExportPDFButton";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AfiliadoList = () => {
  const [afiliados, setAfiliados] = useState([]);
  const [search, setSearch] = useState("");
  const [showActivos, setShowActivos] = useState(false);
  const [editable, setEditable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Variable de entorno para la URL del backend
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch afiliados
  const fetchAfiliados = async () => {
    try {
      const res = await axios.get(API_URL);
      setAfiliados(res.data);
    } catch (err) {
      toast.error("❌ Error al cargar afiliados", { icon: "⚠️" });
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAfiliados();
  }, []);

  const filtered = afiliados.filter((a) => {
    const s = search.trim().toLowerCase();
    const matchesSearch =
      (a.nombre && a.nombre.toLowerCase().includes(s)) ||
      (a.apellido && a.apellido.toLowerCase().includes(s)) ||
      (a.email && a.email.toLowerCase().includes(s)) ||
      (a.dni && String(a.dni).includes(s)) ||
      (a.legajo && String(a.legajo).includes(s)) ||
      (a.telefono && String(a.telefono).includes(s)) ||
      (a.codigo_postal && String(a.codigo_postal).includes(s));

    const matchesActivo = showActivos ? a.activo === 1 || a.activo === true : true;
    return matchesSearch && matchesActivo;
  });

  // Paginación
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Abrir modal edición
  const openEditModal = (afiliado) => {
    setEditable(afiliado);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2>Lista de Afiliados SI.TRA.MU.CI</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Buscar por nombre, apellido, DNI, legajo o email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="checkbox"
            checked={showActivos}
            onChange={() => setShowActivos(!showActivos)}
          />
          Mostrar solo activos
        </label>
      </div>

      <ExportPDFButton data={filtered} />

      <table border="1" cellPadding="5" style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Legajo</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Activo</th>
            <th>Estado Civil</th>
            <th>Fecha Nacimiento</th>
            <th>Domicilio</th>
            <th>Localidad</th>
            <th>Provincia</th>
            <th>Código Postal</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Profesión</th>
            <th>Sector</th>
            <th>Rubro</th>
            <th>Categoría</th>
            <th>Domicilio Laboral</th>
            <th>Fecha Ingreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((a) => (
            <tr key={a.id}>
              <td>{a.legajo}</td>
              <td>{a.nombre}</td>
              <td>{a.apellido}</td>
              <td>{a.dni}</td>
              <td>{a.activo ? "Sí" : "No"}</td>
              <td>{a.estado_civil}</td>
              <td>{a.fecha_nacimiento}</td>
              <td>{a.domicilio}</td>
              <td>{a.localidad}</td>
              <td>{a.provincia}</td>
              <td>{a.codigo_postal}</td>
              <td>{a.email}</td>
              <td>{a.telefono}</td>
              <td>{a.profesion}</td>
              <td>{a.sector}</td>
              <td>{a.rubro}</td>
              <td>{a.categoria}</td>
              <td>{a.domicilio_laboral}</td>
              <td>{a.fecha_ingreso}</td>
              <td>
                <button onClick={() => openEditModal(a)}>Editar</button>
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <td colSpan="23" style={{ textAlign: "center" }}>
                No se encontraron afiliados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {totalPages > 1 && (
        <div style={{ marginTop: "1rem" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              disabled={num === currentPage}
              style={{ marginRight: "0.25rem" }}
            >
              {num}
            </button>
          ))}
        </div>
      )}

      {/* Modal edición */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h3>Editar Afiliado</h3>
          <AfiliadoForm
            editable={editable}
            onSaved={() => {
              setIsModalOpen(false);
              fetchAfiliados();
              toast.success("✅ Cambios guardados correctamente!", { icon: "📝" });
            }}
          />

          <button
            style={{ marginTop: "1rem", backgroundColor: "red", color: "white" }}
            onClick={() => {
              toast.info(
                <div>
                  <p>¿Querés eliminar este afiliado?</p>
                  <div style={{ display: "flex", justifyContent: "space-around", marginTop: "0.5rem" }}>
                    <button
                      onClick={async () => {
                        toast.dismiss();
                        try {
                          await axios.delete(`${API_URL}/${editable.id}`);
                          toast.success("🗑️ Afiliado eliminado correctamente!");
                          fetchAfiliados();
                          setIsModalOpen(false);
                        } catch (err) {
                          toast.error(
                            err.response?.data?.message || "❌ Error al eliminar afiliado",
                            { icon: "⚠️" }
                          );
                        }
                      }}
                      style={{ backgroundColor: "red", color: "white", padding: "0.3rem 0.6rem", border: "none", borderRadius: "4px" }}
                    >
                      Sí, eliminar
                    </button>
                    <button
                      onClick={() => toast.dismiss()}
                      style={{ backgroundColor: "gray", color: "white", padding: "0.3rem 0.6rem", border: "none", borderRadius: "4px" }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>,
                { autoClose: false, closeOnClick: false, closeButton: false }
              );
            }}
          >
            Eliminar Afiliado
          </button>
        </Modal>
      )}

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
    </div>
  );
};

export default AfiliadoList;
