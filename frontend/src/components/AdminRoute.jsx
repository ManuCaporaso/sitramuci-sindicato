import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.role === "admin") {
      return children; // el usuario es admin
    } else {
      return <Navigate to="/" replace />; // no es admin, redirige al dashboard
    }
  } catch (error) {
    console.error("Error al decodificar token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
