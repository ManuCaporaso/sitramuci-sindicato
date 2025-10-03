const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si ya existe usuario
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email ya registrado" });

    // Hashear contraseña
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashed });

    res.status(201).json({ message: "Usuario registrado correctamente", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Credenciales inválidas" });

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

module.exports = router;
