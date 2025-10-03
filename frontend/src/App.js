import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AfiliadosListPage from "./pages/AfilliadosListPage.jsx";
import AfiliadosFormPage from "./pages/AfiliadosFormPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="afiliados" element={<AfiliadosListPage />} />
          <Route path="formulario-afiliados" element={<AfiliadosFormPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
