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

app.use("/api/afiliados", afiliadoRoutes);

const PORT = process.env.PORT || 4000;

// Probar conexión
sequelize.authenticate()
  .then(() => console.log("✅ Conexión establecida con MySQL"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Sincronizar tablas
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Base de datos sincronizada");
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch(error => console.error("Error al sincronizar DB:", error));
