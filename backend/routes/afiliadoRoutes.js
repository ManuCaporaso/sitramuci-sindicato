const express = require("express");
const router = express.Router();
const {
  getAfiliados,
  getAfiliadoById,
  createAfiliado,
  updateAfiliado,
  deleteAfiliado,
  getAfiliadosStats // Asegurate de exportar esta función en tu controller
} = require("../controllers/afiliadoController");

// Ruta para estadísticas (antes de /:id)
router.get("/stats", getAfiliadosStats);

// Rutas CRUD
router.get("/", getAfiliados);
router.get("/:id", getAfiliadoById);
router.post("/", createAfiliado);
router.put("/:id", updateAfiliado);
router.delete("/:id", deleteAfiliado);

module.exports = router;
