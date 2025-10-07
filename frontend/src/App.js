import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ import corregido
import Dashboard from "./components/Dashboard";
import AfiliadosListPage from "./pages/AfiliadosListPage.jsx";
import AfiliadosFormPage from "./pages/AfiliadosFormPage.jsx";
import AdminUsuarios from "./pages/AdminUsuarios.jsx"; // ✅ página de administración
import Footer from "./components/Footer.jsx";
import Login from "./pages/login/Login.jsx";

// =============================
//  Componente para proteger rutas
// =============================
const PrivateRoute = ({ children, rolesAllowed = [] }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);

    // Si hay roles permitidos y el usuario no pertenece a ninguno, lo redirigimos
    if (rolesAllowed.length > 0 && !rolesAllowed.includes(decoded.role)) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
};

// =============================
//  Rutas principales
// =============================
function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Ruta pública: Login */}
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas dentro del Dashboard */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              {/* 👇 Cuando no haya ruta hija, el Dashboard mostrará las stats */}
              <Route index element={<></>} />

              {/* Listado de afiliados */}
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

            {/* Cualquier ruta desconocida redirige al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
