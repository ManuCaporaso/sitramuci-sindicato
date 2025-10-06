const Afiliado = require("../models/Afiliado");
const { Op, fn, col } = require("sequelize");

// 🧹 Función helper para normalizar datos antes de guardar
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
    tipo_contrato: data.tipo_contrato || null,
  };
};

// ✅ Obtener todos los afiliados
exports.getAfiliados = async (req, res) => {
  try {
    const afiliados = await Afiliado.findAll();
    res.json(afiliados);
  } catch (error) {
    console.error("Error al obtener afiliados:", error);
    res.status(500).json({
      error: "Error al obtener afiliados",
      details: error.message,
    });
  }
};

// ✅ Obtener un afiliado por ID
exports.getAfiliadoById = async (req, res) => {
  try {
    const afiliado = await Afiliado.findByPk(req.params.id);
    if (!afiliado)
      return res.status(404).json({ error: "Afiliado no encontrado" });
    res.json(afiliado);
  } catch (error) {
    console.error("Error al obtener afiliado:", error);
    res.status(500).json({
      error: "Error al obtener afiliado",
      details: error.message,
    });
  }
};

// ✅ Crear un afiliado
exports.createAfiliado = async (req, res) => {
  try {
    const payload = sanitizeAfiliado(req.body);
    const nuevoAfiliado = await Afiliado.create(payload);
    res.status(201).json(nuevoAfiliado);
  } catch (error) {
    console.error("Error al crear afiliado:", error);
    res.status(500).json({
      error: "Error al crear afiliado",
      details: error.message,
    });
  }
};

// ✅ Actualizar un afiliado
exports.updateAfiliado = async (req, res) => {
  try {
    const afiliado = await Afiliado.findByPk(req.params.id);
    if (!afiliado)
      return res.status(404).json({ error: "Afiliado no encontrado" });

    const payload = sanitizeAfiliado(req.body);
    await afiliado.update(payload);
    res.json(afiliado);
  } catch (error) {
    console.error("Error al actualizar afiliado:", error);
    res.status(500).json({
      error: "Error al actualizar afiliado",
      details: error.message,
    });
  }
};

// ✅ Eliminar un afiliado
exports.deleteAfiliado = async (req, res) => {
  try {
    const afiliado = await Afiliado.findByPk(req.params.id);
    if (!afiliado)
      return res.status(404).json({ error: "Afiliado no encontrado" });

    await afiliado.destroy();
    res.json({ message: "Afiliado eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar afiliado:", error);
    res.status(500).json({
      error: "Error al eliminar afiliado",
      details: error.message,
    });
  }
};

// ✅ Obtener estadísticas completas de afiliados
exports.getAfiliadosStats = async (req, res) => {
  try {
    // Totales
    const totalAfiliados = await Afiliado.count();
    const afiliadosActivos = await Afiliado.count({ where: { activo: true } });
    const afiliadosInactivos = await Afiliado.count({ where: { activo: false } });

    // Nuevos del mes actual
    const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const nuevosAfiliadosMes = await Afiliado.count({
      where: { createdAt: { [Op.gte]: inicioMes } },
    });

    // Agrupación por sector
    const afiliadosPorSectorRaw = await Afiliado.findAll({
      attributes: ["sector", [fn("COUNT", col("id")), "cantidad"]],
      group: ["sector"],
      order: [[fn("COUNT", col("id")), "DESC"]],
    });

    // Agrupación por categoría
    const afiliadosPorCategoriaRaw = await Afiliado.findAll({
      attributes: ["categoria", [fn("COUNT", col("id")), "cantidad"]],
      group: ["categoria"],
      order: [[fn("COUNT", col("id")), "DESC"]],
    });

    const porTipoContrato = await Afiliado.findAll({
      attributes: ["tipo_contrato", [fn("COUNT", col("id")), "count"]],
      group: ["tipo_contrato"],
    });

    // Formatear resultados
    const afiliadosPorSector = afiliadosPorSectorRaw.map((item) => ({
      sector: item.sector || "Sin especificar",
      cantidad: item.dataValues.cantidad,
    }));

    const afiliadosPorCategoria = afiliadosPorCategoriaRaw.map((item) => ({
      categoria: item.categoria || "Sin especificar",
      cantidad: item.dataValues.cantidad,
    }));

    // Enviar todo junto
    res.status(200).json({
      totalAfiliados,
      afiliadosActivos,
      afiliadosInactivos,
      nuevosAfiliadosMes,
      afiliadosPorSector,
      afiliadosPorCategoria,
      porTipoContrato,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({
      error: "Error al obtener estadísticas",
      details: error.message,
    });
  }
};
