// app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./config/database");
const afiliadoRoutes = require("./routes/afiliadoRoutes");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/afiliados", afiliadoRoutes);

// 👇 Esto es clave: no usamos listen acá
module.exports = app;
