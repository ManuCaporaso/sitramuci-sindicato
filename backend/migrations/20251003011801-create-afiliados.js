'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('afiliados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      dni: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
      },
      estado_civil: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      fecha_nacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      domicilio: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      localidad: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      provincia: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      codigo_postal: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true
      },
      telefono: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      profesion: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      sector: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      rubro: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      categoria: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      legajo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      domicilio_laboral: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      fecha_ingreso: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('afiliados');
  }
};
