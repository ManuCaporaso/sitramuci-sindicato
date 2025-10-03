import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AfiliadosListPage from "./pages/AfilliadosListPage.jsx";
import AfiliadosFormPage from "./pages/AfiliadosFormPage.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <Router>
      <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route path="afiliados" element={<AfiliadosListPage />} />
              <Route path="formulario-afiliados" element={<AfiliadosFormPage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}



export default App;
