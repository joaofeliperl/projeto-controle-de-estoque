import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false
    }
);

// Testando conexão
db.authenticate()
    .then(() => console.log("✅ Conexão com o MySQL bem-sucedida!"))
    .catch(err => console.error("❌ Erro ao conectar ao banco de dados:", err));

export default db;
