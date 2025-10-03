import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    activos: 0,
    porSector: [],
  });

  // Tomar la URL de la API desde variable de entorno
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Traer estadísticas de afiliados desde la API
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/stats`);
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [API_URL]); // Dependencia de la URL para eslint

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
      </aside>

      <main className="content">
        <Outlet /> {/* Aquí se renderizan las páginas hijas */}

        <div className="dashboard-home">
          <img
            src="/logositramuci.png"
            alt="Logo Sindicato"
            className="sindicato-logo"
          />
          <h1>Bienvenido a SI.TRA.MU.CI</h1>
          <p>Selecciona una opción del menú lateral para comenzar a gestionar los afiliados y reportes.</p>
          <button onClick={() => navigate("/formulario-afiliados")} className="btn-primary">
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
