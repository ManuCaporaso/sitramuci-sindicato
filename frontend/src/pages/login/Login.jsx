import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig"; // <- Importamos la instancia
import { ToastContainer, toast, Slide } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData); // usamos la instancia
      const { token } = res.data;

      localStorage.setItem("token", token);
      toast.success("✅ Login exitoso!", { autoClose: 2000 });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "❌ Error al iniciar sesión";
      toast.error(msg, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <img src="/logositramuci.png" alt="Logo Sindicato" />
        <div className="sindicato-name">SI.TRA.MU.CI</div>
        <h2>Iniciar Sesión</h2>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="ejemplo@dominio.com"
          />
          <FaEnvelope className="input-icon" />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Tu contraseña"
          />
          <FaLock className="input-icon" />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Cargando..." : "Ingresar"}
        </button>

        <div className="login-footer">
          Acceso restringido a personal autorizado
        </div>
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
    </div>
  );
};

export default Login;
