const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const isEditor = require("../middlewares/isEditor");
const {
  getAfiliados,
  getAfiliadoById,
  createAfiliado,
  updateAfiliado,
  deleteAfiliado,
  getAfiliadosStats
} = require("../controllers/afiliadoController");

// Ruta para estadísticas (antes de /:id)
router.get("/stats", authenticate, getAfiliadosStats);

// Rutas CRUD
router.get("/", authenticate, getAfiliados);          // todos los roles pueden ver
router.get("/:id", authenticate, getAfiliadoById);   // todos los roles pueden ver

// Solo editor o admin pueden crear, actualizar y eliminar
router.post("/", authenticate, isEditor, createAfiliado);
router.put("/:id", authenticate, isEditor, updateAfiliado);
router.delete("/:id", authenticate, isEditor, deleteAfiliado);

module.exports = router;
