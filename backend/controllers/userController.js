const bcrypt = require("bcrypt");
const { User } = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
