import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AfiliadosListPage from "./pages/AfiliadosListPage.jsx";
import AfiliadosFormPage from "./pages/AfiliadosFormPage.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/login/Login.jsx";

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // revisa si hay token
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Ruta pública */}
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas */}
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }>
              <Route path="afiliados" element={<AfiliadosListPage />} />
              <Route path="formulario-afiliados" element={<AfiliadosFormPage />} />
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
