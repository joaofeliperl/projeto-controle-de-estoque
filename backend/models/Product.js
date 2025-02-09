import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Product = db.define("Product", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    codigo_barras: { type: DataTypes.STRING, allowNull: true },
    estoque_atual: { type: DataTypes.INTEGER, allowNull: false },
    estoque_minimo: { type: DataTypes.INTEGER, allowNull: true },
    valor_venda: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    valor_custo: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    margem_lucro: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.valor_custo) {
                return ((this.valor_venda - this.valor_custo) / this.valor_custo) * 100;
            }
            return null;
        }
    },
    fornecedor_id: { type: DataTypes.INTEGER, allowNull: true },
    observacoes: { type: DataTypes.TEXT, allowNull: true },
    imagem_1: { type: DataTypes.STRING, allowNull: true },
    imagem_2: { type: DataTypes.STRING, allowNull: true },
    imagem_3: { type: DataTypes.STRING, allowNull: true },
    imagem_4: { type: DataTypes.STRING, allowNull: true }
}, { tableName: "produtos", timestamps: false });

export default Product;
