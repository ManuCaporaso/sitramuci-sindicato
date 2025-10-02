const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Afiliado = sequelize.define("Afiliado", {
  nombre: { type: DataTypes.STRING(50), allowNull: false },
  apellido: { type: DataTypes.STRING(50), allowNull: false },
  dni: { type: DataTypes.STRING(15), allowNull: false, unique: true },
  estado_civil: { type: DataTypes.STRING(20) },
  fecha_nacimiento: { type: DataTypes.DATEONLY },
  domicilio: { type: DataTypes.STRING(100) },
  localidad: { type: DataTypes.STRING(50) },
  provincia: { type: DataTypes.STRING(50) },
  codigo_postal: { type: DataTypes.STRING(10) },
  email: { type: DataTypes.STRING(100), unique: true },
  telefono: { type: DataTypes.STRING(20) },
  profesion: { type: DataTypes.STRING(50) },
  sector: { type: DataTypes.STRING(50) },
  rubro: { type: DataTypes.STRING(50) },
  categoria: { type: DataTypes.STRING(50) },
  legajo: { type: DataTypes.STRING(20), unique: true },
  domicilio_laboral: { type: DataTypes.STRING(100) },
  fecha_ingreso: { type: DataTypes.DATEONLY }
}, {
  timestamps: true,
  tableName: "afiliados"
});

module.exports = Afiliado;
