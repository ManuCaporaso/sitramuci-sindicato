import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";
import api from "../utils/axiosConfig";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    activos: 0,
    porSector: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/afiliados/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // eliminar token
    navigate("/login"); // redirigir al login
  };

  return (
    <div className="dashboard">
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
            <li><Link to="/afiliados">Afiliados</Link></li>
            <li><Link to="/formulario-afiliados">Formulario Afiliados</Link></li>
          </ul>
        </nav>
        {/* Botón de Cerrar Sesión */}
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

      <main className="content">
        <Outlet />

        <div className="dashboard-home">
          <img
            src="/logositramuci.png"
            alt="Logo Sindicato"
            className="sindicato-logo"
          />
          <h1>Bienvenido a SI.TRA.MU.CI</h1>
          <p>Selecciona una opción del menú lateral para comenzar a gestionar los afiliados y reportes.</p>
          <button
            onClick={() => navigate("/formulario-afiliados")}
            className="btn-primary"
          >
            Agregar nuevo afiliado
          </button>

          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Afiliados</h3>
              <p>{stats.total}</p>
            </div>
            <div className="card">
              <h3>Afiliados Activos</h3>
              <p>{stats.activos}</p>
            </div>
            {(stats.porSector || []).map((s, i) => (
              <div className="card" key={i}>
                <h3>{s.sector}</h3>
                <p>{s.count}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
