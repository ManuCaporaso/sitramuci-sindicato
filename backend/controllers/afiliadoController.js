const Afiliado = require("../models/Afiliado");
const { Op, fn, col } = require("sequelize");

// Función helper para normalizar datos antes de guardar
const sanitizeAfiliado = (data) => {
  return {
    ...data,
    dni: data.dni ? parseInt(data.dni, 10) : null,
    telefono: data.telefono ? parseInt(data.telefono, 10) : null,
    codigo_postal: data.codigo_postal ? parseInt(data.codigo_postal, 10) : null,
    legajo: data.legajo ? parseInt(data.legajo, 10) : null,
    fecha_nacimiento: data.fecha_nacimiento || null,
    fecha_ingreso: data.fecha_ingreso || null,
    email: data.email || null,
    activo: data.activo === true || data.activo === 1,
  };
};

// Obtener todos los afiliados
exports.getAfiliados = async (req, res) => {
  try {
    const afiliados = await Afiliado.findAll();
    res.json(afiliados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener afiliados", details: error.message });
  }
};

// Obtener un afiliado por ID
exports.getAfiliadoById = async (req, res) => {
  try {
    const afiliado = await Afiliado.findByPk(req.params.id);
    if (!afiliado) return res.status(404).json({ error: "Afiliado no encontrado" });
    res.json(afiliado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener afiliado", details: error.message });
  }
};

// Crear un afiliado
exports.createAfiliado = async (req, res) => {
  try {
    const payload = sanitizeAfiliado(req.body);
    const nuevoAfiliado = await Afiliado.create(payload);
    res.status(201).json(nuevoAfiliado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear afiliado", details: error.message });
  }
};

// Actualizar un afiliado
exports.updateAfiliado = async (req, res) => {
  try {
    const afiliado = await Afiliado.findByPk(req.params.id);
    if (!afiliado) return res.status(404).json({ error: "Afiliado no encontrado" });

    const payload = sanitizeAfiliado(req.body);
    await afiliado.update(payload);
    res.json(afiliado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar afiliado", details: error.message });
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
    console.error(error);
    res.status(500).json({ error: "Error al eliminar afiliado", details: error.message });
  }
};

// Obtener estadísticas de afiliados
exports.getAfiliadosStats = async (req, res) => {
  try {
    const total = await Afiliado.count();
    const activos = await Afiliado.count({ where: { activo: true } });
    const inactivos = await Afiliado.count({ where: { activo: false } });

    const porSector = await Afiliado.findAll({
      attributes: ["sector", [fn("COUNT", col("id")), "count"]],
      group: ["sector"],
    });

    const porCategoria = await Afiliado.findAll({
      attributes: ["categoria", [fn("COUNT", col("id")), "count"]],
      group: ["categoria"],
    });

    res.json({
      total,
      activos,
      inactivos,
      porSector,
      porCategoria,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener estadísticas", details: error.message });
  }
};
