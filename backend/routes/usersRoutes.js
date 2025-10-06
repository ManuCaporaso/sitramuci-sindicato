const express = require("express");
const User = require("../models/User");
const authenticate = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// ============================
// Obtener todos los usuarios (solo admin)
// ============================
router.get("/", authenticate, checkAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role"],
      order: [["id", "ASC"]],
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

module.exports = router;
