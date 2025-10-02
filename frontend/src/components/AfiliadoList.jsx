import React, { useEffect, useState } from "react";
import axios from "axios";

const AfiliadoList = ({ onEdit }) => {
  const [afiliados, setAfiliados] = useState([]);

  const fetchAfiliados = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/afiliados");
      setAfiliados(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAfiliado = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/afiliados/${id}`);
      fetchAfiliados();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAfiliados();
  }, []);

  return (
    <div>
      <h2>Lista de Afiliados</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {afiliados.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.nombre}</td>
              <td>{a.apellido}</td>
              <td>{a.dni}</td>
              <td>
                <button onClick={() => onEdit(a)}>Editar</button>
                <button onClick={() => deleteAfiliado(a.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AfiliadoList;
