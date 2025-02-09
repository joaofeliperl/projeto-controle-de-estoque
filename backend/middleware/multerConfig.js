import multer from "multer";
import path from "path";
import fs from "fs";

// Criar diretório "uploads" se não existir
const uploadDir = path.join("uploads/");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("📂 Salvando arquivo em:", uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        console.log("📸 Nome do arquivo recebido:", file.originalname);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Configuração do multer para aceitar imagens
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB por arquivo
}).array("imagens", 4); // **Aqui o nome deve ser "imagens"**

export default upload;
