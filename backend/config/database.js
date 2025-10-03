const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión con PostgreSQL exitosa");
  } catch (err) {
    console.error("❌ Error de conexión:", err);
  }
};

module.exports = { sequelize, connectDB }; // exportamos la instancia y la función
