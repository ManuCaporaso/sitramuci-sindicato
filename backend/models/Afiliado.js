const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Afiliado = sequelize.define("Afiliado", {
  nombre: { type: DataTypes.STRING(50), allowNull: false },
  apellido: { type: DataTypes.STRING(50), allowNull: false },
  dni: { 
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false, 
    unique: true,
    validate: { isInt: true, min: 1 }
  },
  estado_civil: { type: DataTypes.STRING(20), allowNull: true },
  fecha_nacimiento: { type: DataTypes.DATEONLY, allowNull: true },
  domicilio: { type: DataTypes.STRING(100), allowNull: true },
  localidad: { type: DataTypes.STRING(50), allowNull: true },
  provincia: { type: DataTypes.STRING(50), allowNull: true },
  codigo_postal: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    allowNull: true,
    validate: { min: 0 }
  },
  email: { 
    type: DataTypes.STRING(100), 
    allowNull: true,
    unique: true,
    validate: { isEmail: true }
  },
  telefono: { 
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    validate: { isInt: true, min: 0 }
  },
  profesion: { type: DataTypes.STRING(50), allowNull: true },
  sector: { type: DataTypes.STRING(50), allowNull: true },
  rubro: { type: DataTypes.STRING(50), allowNull: true },
  categoria: { type: DataTypes.STRING(50), allowNull: true },
  legajo: { 
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true,
    validate: { isInt: true, min: 1 }
  },
  domicilio_laboral: { type: DataTypes.STRING(100), allowNull: true },
  fecha_ingreso: { type: DataTypes.DATEONLY, allowNull: true },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
  timestamps: true,
  tableName: "afiliados"
});
module.exports = Afiliado;
