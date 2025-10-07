import React, { useEffect, useState } from "react";
import "../Styles/Stats.css";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      const API_BASE_URL = process.env.REACT_APP_API_URL;
      const API_ENDPOINT = "/afiliados/stats";

      if (!API_BASE_URL) {
        setError("REACT_APP_API_URL no está definida en las variables de entorno.");
        return;
      }

      const fullUrl = `${API_BASE_URL}${API_ENDPOINT}`;

      if (!token) {
        setError("No se encontró token de autenticación.");
        return;
      }

      try {
        const res = await fetch(fullUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `Error al obtener estadísticas: ${res.status} ${errorText.substring(0, 50)}...`
          );
        }

        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStats();
  }, []);

  if (error) return <p className="stats-error"> Error: {error}</p>;
  if (!stats) return <p className="stats-loading">Cargando estadísticas...</p>;

  return (
    <div className="stats-container">
      <h2> Estadísticas Generales</h2>

      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total de Afiliados</h3>
          <p>{stats.totalAfiliados || 0}</p>
        </div>

        <div className="stat-card activos">
          <h3>Afiliados Activos</h3>
          <p>{stats.afiliadosActivos || 0}</p>
        </div>

        <div className="stat-card inactivos">
          <h3>Afiliados Inactivos</h3>
          <p>{stats.afiliadosInactivos || 0}</p>
        </div>

        <div className="stat-card nuevos">
          <h3>Nuevos este mes</h3>
          <p>{stats.nuevosAfiliadosMes || 0}</p>
        </div>
      </div>

      {/*  Afiliados por sector */}
      <div className="stats-section">
        <h3> Afiliados por Sector</h3>
        <ul className="stats-list">
          {stats.afiliadosPorSector && stats.afiliadosPorSector.length > 0 ? (
            stats.afiliadosPorSector.map((item, index) => (
              <li key={index}>
                <strong>{item.sector}</strong>: {item.cantidad}
              </li>
            ))
          ) : (
            <li>No hay datos disponibles</li>
          )}
        </ul>
      </div>

      {/*  Afiliados por categoría */}
      <div className="stats-section">
        <h3> Afiliados por Categoría</h3>
        <ul className="stats-list">
          {stats.afiliadosPorCategoria && stats.afiliadosPorCategoria.length > 0 ? (
            stats.afiliadosPorCategoria.map((item, index) => (
              <li key={index}>
                <strong>{item.categoria}</strong>: {item.cantidad}
              </li>
            ))
          ) : (
            <li>No hay datos disponibles</li>
          )}
        </ul>
      </div>

            {/*  Afiliados por contrato */}
      <div className="stats-section">
        <h3> Afiliados por Tipo de Contrato</h3>
        <ul className="stats-list">
          {stats.porTipoContrato && stats.porTipoContrato.length > 0 ? (
            stats.porTipoContrato.map((item, index) => (
              <li key={index}>
                <strong>{item.tipo_contrato || "Sin especificar"}</strong>: {item.count}
              </li>
            ))
          ) : (
            <li>No hay datos disponibles</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Stats;
