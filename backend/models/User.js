const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database"); // <-- desestructuramos la instancia

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "user" },
}, {
  timestamps: true,
  tableName: "users"
});

module.exports = User;
