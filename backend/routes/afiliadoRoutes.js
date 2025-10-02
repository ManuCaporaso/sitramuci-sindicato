const express = require("express");
const router = express.Router();
const { getAfiliados, getAfiliadoById, createAfiliado, updateAfiliado, deleteAfiliado } = require("../controllers/afiliadoController");

router.get("/", getAfiliados);
router.get("/:id", getAfiliadoById);
router.post("/", createAfiliado);
router.put("/:id", updateAfiliado);
router.delete("/:id", deleteAfiliado);

module.exports = router;
