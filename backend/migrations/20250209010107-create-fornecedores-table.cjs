"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("fornecedores", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      nome: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: true },
      cnpj: { type: Sequelize.STRING, allowNull: true },
      celular: { type: Sequelize.STRING, allowNull: true },
      celular_whatsapp: { type: Sequelize.BOOLEAN, allowNull: true },
      telefone: { type: Sequelize.STRING, allowNull: true },
      cep: { type: Sequelize.STRING, allowNull: true },
      bairro: { type: Sequelize.STRING, allowNull: true },
      cidade: { type: Sequelize.STRING, allowNull: true },
      estado: { type: Sequelize.STRING, allowNull: true },
      rua: { type: Sequelize.STRING, allowNull: true },
      numero: { type: Sequelize.STRING, allowNull: true },
      complemento: { type: Sequelize.STRING, allowNull: true },
      observacoes: { type: Sequelize.TEXT, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("fornecedores");
  },
};
