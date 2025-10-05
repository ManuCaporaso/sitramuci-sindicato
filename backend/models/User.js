const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "editor", "user"),
      defaultValue: "user", // por defecto un usuario común
    },
  },
  {
    timestamps: true,
    tableName: "users",      // fuerza que la tabla se llame "users"
    freezeTableName: true,   // evita que Sequelize pluralice el nombre
  }
);

module.exports = User;
