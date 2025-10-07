import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Stats from "../pages/Stats"; 
import "../Styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [role, setRole] = useState("user");

  // Leer token y rol
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role || "user");
      } catch (err) {
        console.error("Token inválido:", err);
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <Link to="/" className="sidebar-logo-link">
          <img
            src="/logositramuci.png"
            alt="Logo Sindicato"
            className="sidebar-logo"
          />
        </Link>

        <nav>
          <ul>
            <li>
              <Link to="/afiliados">Afiliados</Link>
            </li>
            {(role === "editor" || role === "admin") && (
              <li>
                <Link to="/formulario-afiliados">Formulario Afiliados</Link>
              </li>
            )}
            {role === "admin" && (
              <li>
                <Link to="/admin">Administración</Link>
              </li>
            )}
          </ul>
        </nav>

        <div style={{ marginTop: "auto", padding: "1rem" }}>
          <button
            onClick={handleLogout}
            className="btn-primary"
            style={{ width: "100%" }}
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="content">
        <Outlet context={{ role }} />

        {/* Si está en la raíz, mostrar estadísticas */}
        {location.pathname === "/" && <Stats />}
      </main>
    </div>
  );
};

export default Dashboard;
