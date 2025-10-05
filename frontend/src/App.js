import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // ✅ import default corregido
import Dashboard from "./components/Dashboard";
import AfiliadosListPage from "./pages/AfiliadosListPage.jsx";
import AfiliadosFormPage from "./pages/AfiliadosFormPage.jsx";
import AdminUsuarios from "./pages/AdminUsuarios.jsx"; // ✅ página de administración
import Footer from "./components/Footer.jsx";
import Login from "./pages/login/Login.jsx";

// Componente para proteger rutas
const PrivateRoute = ({ children, rolesAllowed = [] }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);

    // Si rolesAllowed está definido y el rol del usuario no está permitido
    if (rolesAllowed.length > 0 && !rolesAllowed.includes(decoded.role)) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Ruta pública */}
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/afiliados" replace />} />
              <Route path="afiliados" element={<AfiliadosListPage />} />

              {/* Solo editor o admin pueden crear/editar afiliados */}
              <Route
                path="formulario-afiliados"
                element={
                  <PrivateRoute rolesAllowed={["editor", "admin"]}>
                    <AfiliadosFormPage />
                  </PrivateRoute>
                }
              />

              {/* Solo admins pueden acceder a administración de usuarios */}
              <Route
                path="admin"
                element={
                  <PrivateRoute rolesAllowed={["admin"]}>
                    <AdminUsuarios />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* Redirige cualquier ruta no definida */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
