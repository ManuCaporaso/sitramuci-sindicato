// server.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// ⬇️ Importa el modelo User y bcryptjs
const User = require("./models/User"); // Asume que tu modelo User está aquí
const bcrypt = require("bcryptjs");
// ⬆️
const { sequelize, connectDB } = require("./config/database");
const afiliadoRoutes = require("./routes/afiliadoRoutes");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Datos del Admin (idealmente, estas credenciales deberían venir de variables de entorno)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "superadmin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD_RAW = process.env.ADMIN_PASSWORD || "AdminPass123";

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/afiliados", afiliadoRoutes);

const PORT = process.env.PORT ;

/**
 * Función para verificar y crear el usuario administrador
 */
async function createAdminUser() {
  try {
    const [admin, created] = await User.findOrCreate({
      where: { email: ADMIN_EMAIL },
      defaults: {
        username: ADMIN_USERNAME,
        // ✅ Hashing la contraseña antes de guardarla
        password: await bcrypt.hash(ADMIN_PASSWORD_RAW, 10),
        role: "admin",
      },
    });

    if (created) {
      console.log(`✅ Usuario Administrador '${ADMIN_USERNAME}' creado exitosamente.`);
    } else {
      console.log(`ℹ️ El Usuario Administrador '${ADMIN_USERNAME}' ya existe. Saltando la creación.`);
    }
  } catch (error) {
    console.error("❌ ERROR al crear usuario administrador:", error.message);
    // Si la creación falla (ej: error de validación), el servidor puede continuar, pero es bueno registrarlo.
  }
}

// Conectar a DB, sincronizar tablas y crear Admin
connectDB()
  // 1. Sincronizar (crear/modificar) las tablas
  .then(() => sequelize.sync({ alter: true }))
  // 2. Ejecutar la función para crear el Admin
  .then(createAdminUser)
  // 3. Iniciar el servidor
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error FATAL al iniciar servidor:", err.message);
    process.exit(1); // Detiene el proceso si la DB no se sincroniza
  });