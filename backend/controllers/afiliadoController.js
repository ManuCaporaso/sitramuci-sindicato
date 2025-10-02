const Afiliado = require("../models/Afiliado");

// Obtener todos los afiliados
exports.getAfiliados = async (req, res) => {
  try {
    const afiliados = await Afiliado.findAll();
    res.json(afiliados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener afiliados" });
  }
};

// Obtener un afiliado por ID
exports.getAfiliadoById = async (req, res) => {
  try {
    const afiliado = await Afiliado.findByPk(req.params.id);
    if (!afiliado) return res.status(404).json({ error: "Afiliado no encontrado" });
    res.json(afiliado);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener afiliado" });
  }
};

// Crear un afiliado
exports.createAfiliado = async (req, res) => {
  try {
    const nuevoAfiliado = await Afiliado.create(req.body);
    res.status(201).json(nuevoAfiliado);
  } catch (error) {
    res.status(500).json({ error: "Error al crear afiliado", details: error.message });
  }
};

// Actualizar un afiliado
exports.updateAfiliado = async (req, res) => {
  try {
    const afiliado = await Afiliado.findByPk(req.params.id);
    if (!afiliado) return res.status(404).json({ error: "Afiliado no encontrado" });

    await afiliado.update(req.body);
    res.json(afiliado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar afiliado" });
  }
};

// Eliminar un afiliado
exports.deleteAfiliado = async (req, res) => {
  try {
    const afiliado = await Afiliado.findByPk(req.params.id);
    if (!afiliado) return res.status(404).json({ error: "Afiliado no encontrado" });

    await afiliado.destroy();
    res.json({ message: "Afiliado eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar afiliado" });
  }
};
