import React from "react";
import "../Styles/Footer.css";
import { FaFacebook, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h4>Manuel Caporaso</h4>
          <p>
            <FaEnvelope style={{ marginRight: "0.3rem" }} />
            <a href="mailto:manuelcaporaso20@gmail.com">manuelcaporaso20@gmail.com</a>
          </p>
          <p>Tel: +54 9 11 1234 5678</p>
        </div>

        <div className="footer-redes">
          <h4>Redes Sociales</h4>
          <a href="https://www.linkedin.com/in/manu-caporaso/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin style={{ marginRight: "0.3rem" }} /> LinkedIn
          </a>
          <a href="https://github.com/ManuCaporaso" target="_blank" rel="noopener noreferrer">
            <FaFacebook style={{ marginRight: "0.3rem" }} /> GitHub
          </a>
        </div>
      </div>

      <div className="footer-rights">
        © {new Date().getFullYear()} Manuel Caporaso. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
