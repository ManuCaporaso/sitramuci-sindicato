const isEditor = (req, res, next) => {
  if (req.user.role !== "editor" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: solo para editores" });
  }
  next();
};

module.exports = isEditor;
