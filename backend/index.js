import express from "express";
import cors from "cors";
import db from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";

dotenv.config(); // Carrega variáveis do .env

const app = express();
app.use(cors());
app.use(express.json());

// Verifica se as variáveis de ambiente estão carregadas corretamente
console.log("🔍 Variáveis de ambiente carregadas:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "****" : "NÃO DEFINIDO");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("PORT:", process.env.PORT || 5001);

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Testa a conexão com o banco antes de sincronizar
db.authenticate()
    .then(() => {
        console.log("✅ Conexão com o MySQL bem-sucedida!");

        return db.sync({ alter: false, force: false }); // Evita recriação de tabelas
    })
    .then(() => console.log("✅ Banco de dados sincronizado com sucesso!"))
    .catch(err => console.error("❌ Erro ao conectar ao banco de dados:", err));

// Define um valor padrão para a porta caso `process.env.PORT` não esteja definida
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
