import { DataTypes } from "sequelize";
import db from "../config/database.js";

const User = db.define("User", {
    userid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
}, { tableName: "usuario", timestamps: false });

export default User;
