const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./config/database");
const afiliadoRoutes = require("./routes/afiliadoRoutes");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/afiliados", afiliadoRoutes);

// Probar conexión (esto se ejecuta en cada request, por eso conviene probar 1 sola vez en local)
sequelize.authenticate()
  .then(() => console.log("✅ Conexión con PostgreSQL"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Exportar para Vercel
module.exports = app;
