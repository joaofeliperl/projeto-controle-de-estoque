import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Product = db.define("Product", {
    codigo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    categoria: { type: DataTypes.STRING, allowNull: false },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    quant: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: "produtos", timestamps: false });

export default Product;
