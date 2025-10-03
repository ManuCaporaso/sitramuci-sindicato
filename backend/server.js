const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize, connectDB } = require("./config/database"); // <- desestructuramos
const afiliadoRoutes = require("./routes/afiliadoRoutes");
const authRoutes = require("./routes/authRoutes");
const authenticate = require("./middlewares/authMiddleware");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/afiliados", authenticate, afiliadoRoutes); // solo usuarios logueados

const PORT = process.env.PORT || 4000; // <- corregido

// Conectar a DB y sincronizar tablas
connectDB()
  .then(() => {
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Base de datos sincronizada");
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Error al iniciar servidor:", err);
  });
