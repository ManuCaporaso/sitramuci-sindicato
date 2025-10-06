import React, { useState } from 'react'; // Importar React y useState
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Como jwt-decode no puede resolverse en este entorno, creamos una función mock
const jwtDecode = (token) => {
  // Simulación básica de decodificación de JWT para fines de demostración
  // En un entorno real, DEBES instalar 'jwt-decode'
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    console.error("Token inválido en la simulación:", e);
    return { role: 'guest' };
  }
};

// -----------------------------------------------------
// --- Componentes Mock para hacer el código ejecutable ---
// -----------------------------------------------------

const Footer = () => (
  <footer style={{ padding: '10px', textAlign: 'center', backgroundColor: '#3b82f6', color: 'white', marginTop: 'auto' }}>
    <p>Derechos Reservados © 2024</p>
  </footer>
);

const UserInfo = ({ role, username }) => (
    <div style={{ padding: '10px', backgroundColor: '#e0f2fe', borderRadius: '8px', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 5px 0' }}>Usuario Actual</h4>
        <p style={{ margin: 0 }}>**Rol:** {role}</p>
        <p style={{ margin: 0 }}>**Usuario:** {username}</p>
    </div>
);

const Dashboard = () => {
  const token = localStorage.getItem("token");
  let decoded = { role: 'guest', username: 'Invitado' };
  if (token) {
      try {
          decoded = jwtDecode(token);
      } catch (e) { /* ignore */ }
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
        <h1>Panel de Control</h1>
        <UserInfo role={decoded.role} username={decoded.username || 'N/A'}/>
        <p>Selecciona una opción en la barra lateral (si la hubiera) o accede a las rutas anidadas.</p>
        <p>Tu rol te da acceso a:</p>
        <ul>
            <li>/afiliados (Todos)</li>
            <li>/stats (Todos)</li>
            {decoded.role === 'editor' || decoded.role === 'admin' ? <li>/formulario-afiliados (Editor/Admin)</li> : null}
            {decoded.role === 'admin' ? <li>/admin (Admin)</li> : null}
        </ul>
        <div style={{ padding: '15px', border: '1px dashed #3b82f6', marginTop: '20px' }}>
            {/* Aquí se renderizarán los componentes anidados de Route */}
            <Routes>
                <Route index element={<h2>Bienvenido al Dashboard.</h2>} />
                <Route path="afiliados" element={<AfiliadosListPage />} />
                <Route path="stats" element={<StatsPage />} />
                <Route path="formulario-afiliados" element={<AfiliadosFormPage />} />
                <Route path="admin" element={<AdminUsuarios />} />
            </Routes>
        </div>
    </div>
  );
};

// Páginas accesibles por todos los logueados
const StatsPage = () => <div style={{ padding: '20px' }}><h2>📊 Página de Estadísticas</h2><p>Esta página es accesible por todos los usuarios autenticados (user, editor, admin).</p></div>;
const AfiliadosListPage = () => <div style={{ padding: '20px' }}><h2>📝 Lista de Afiliados</h2><p>Esta página es accesible por todos los usuarios autenticados (user, editor, admin).</p></div>;

// Páginas de acceso restringido
const AfiliadosFormPage = () => <div style={{ padding: '20px', backgroundColor: '#ffedd5' }}><h2>✍️ Formulario de Afiliados</h2><p>Solo accesible para roles **editor** y **admin**.</p></div>;
const AdminUsuarios = () => <div style={{ padding: '20px', backgroundColor: '#fecaca' }}><h2>⚙️ Administración de Usuarios</h2><p>Solo accesible para el rol **admin**.</p></div>;

// Componente de Login (simulación)
const Login = () => {
    const [role, setRole] = useState('user');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        // Simulación: crea un token falso con el rol seleccionado
        const payload = { role: role, username: `Usuario_${role}`, iat: Date.now() };
        const token = `header.${btoa(JSON.stringify(payload))}.signature`; 
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        window.location.reload(); // Forzar recarga para que PrivateRoute se recalcule
    };

    if (isAuthenticated || localStorage.getItem("token")) {
        return <Navigate to="/" replace />;
    }

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            <h2>Iniciar Sesión (Simulación)</h2>
            <p>Selecciona el rol para probar las restricciones:</p>
            <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                style={{ padding: '10px', margin: '10px 0', width: '100%' }}
            >
                <option value="user">Usuario (Rol: user)</option>
                <option value="editor">Editor (Rol: editor)</option>
                <option value="admin">Administrador (Rol: admin)</option>
            </select>
            <button 
                onClick={handleLogin}
                style={{ padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Iniciar Sesión como {role}
            </button>
            <p style={{ marginTop: '15px' }}>
                <a href="/stats" onClick={() => localStorage.removeItem("token")}>Ver Stats (Ruta Protegida)</a>
            </p>
        </div>
    );
};
// -----------------------------------------------------

// Componente para proteger rutas
const PrivateRoute = ({ children, rolesAllowed = [] }) => {
  const token = localStorage.getItem("token");
  
  // 1. Si no hay token, redirigir al login
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    
    // 2. Si hay roles especificados y el rol del usuario no está permitido, redirigir a la ruta principal
    if (rolesAllowed.length > 0 && !rolesAllowed.includes(decoded.role)) {
      console.warn(`Acceso denegado: Usuario ${decoded.role} intentó acceder a ruta solo para ${rolesAllowed.join(', ')}.`);
      return <Navigate to="/" replace />;
    }

    // 3. Autenticado y autorizado (si se especificó rol)
    return children;
  } catch (err) {
    // 4. Si el token es inválido o expiró
    console.error("Error decodificando el token:", err);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: 'Inter, sans-serif' }}
      >
        {/* Usamos un div para el contenido principal con flex: 1 */}
        <div style={{ flex: 1 }}>
          <Routes>
            {/* -------------------- Ruta pública -------------------- */}
            <Route path="/login" element={<Login />} />

            {/* -------------------- Rutas Protegidas (Requieren Login) -------------------- */}
            <Route
              path="/"
              element={
                // Todas las rutas anidadas debajo de esta línea requieren login (PrivateRoute sin rolesAllowed)
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              {/* Ruta por defecto después del login */}
              <Route index element={<Navigate to="/afiliados" replace />} />
              
              {/* Ruta "stats" - Accesible por TODOS los logueados (user, editor, admin) */}
              <Route path="stats" element={<StatsPage />} />

              {/* Ruta "afiliados" - Accesible por TODOS los logueados (user, editor, admin) */}
              <Route path="afiliados" element={<AfiliadosListPage />} />

              {/* Ruta "formulario-afiliados" - Solo editor o admin */}
              <Route
                path="formulario-afiliados"
                element={
                  // PrivateRoute con restricción de roles
                  <PrivateRoute rolesAllowed={["editor", "admin"]}>
                    <AfiliadosFormPage />
                  </PrivateRoute>
                }
              />

              {/* Ruta "admin" - Solo admins */}
              <Route
                path="admin"
                element={
                  // PrivateRoute con estricción de rol "admin"
                  <PrivateRoute rolesAllowed={["admin"]}>
                    <AdminUsuarios />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* Redirige cualquier ruta no definida a la raíz */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
