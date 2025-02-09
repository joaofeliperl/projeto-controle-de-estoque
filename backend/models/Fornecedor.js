import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Fornecedor = db.define("Fornecedor", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false }, // 🔥 Nome obrigatório
    email: { type: DataTypes.STRING, allowNull: true },
    cnpj: { type: DataTypes.STRING, allowNull: true },
    celular: { type: DataTypes.STRING, allowNull: true },
    celular_whatsapp: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false }, // 🔥 Checkbox para WhatsApp
    telefone: { type: DataTypes.STRING, allowNull: true },
    cep: { type: DataTypes.STRING, allowNull: true },
    bairro: { type: DataTypes.STRING, allowNull: true },
    cidade: { type: DataTypes.STRING, allowNull: true },
    estado: { type: DataTypes.STRING, allowNull: true },
    rua: { type: DataTypes.STRING, allowNull: true },
    numero: { type: DataTypes.STRING, allowNull: true },
    complemento: { type: DataTypes.STRING, allowNull: true },
    observacoes: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: "fornecedores", timestamps: false });

export default Fornecedor;
