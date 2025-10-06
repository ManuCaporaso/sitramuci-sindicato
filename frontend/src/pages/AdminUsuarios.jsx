import React, { useEffect, useState } from "react";
import api from "../utils/axiosConfig";

const AdminUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      setFormData({ username: "", email: "", password: "", role: "user" });
      fetchUsers();
      alert("Usuario creado correctamente ✅");
    } catch (err) {
      console.error(err);
      alert("Error al crear usuario ❌");
    }
  };

  return (
    <div>
      <h2>Administración de Usuarios</h2>
      <form onSubmit={handleCreateUser}>
        <input type="text" name="username" placeholder="Usuario" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">Usuario</option>
          <option value="editor">Editor</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Crear Usuario</button>
      </form>

      <h3>Usuarios existentes</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsuarios;
