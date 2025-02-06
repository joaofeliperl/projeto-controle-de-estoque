import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginRequired = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Acesso não autorizado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token inválido" });
    }
};
