"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("produtos", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo_interno: {
        type: Sequelize.STRING(13),
        allowNull: false,
        unique: true
      },
      codigo_barras: {
        type: Sequelize.STRING,
        allowNull: true
      },
      estoque_atual: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      estoque_minimo: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      valor_venda: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      valor_custo: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      fornecedor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "fornecedores", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      observacoes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      imagem1: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imagem2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imagem3: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imagem4: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("produtos");
  },
};
