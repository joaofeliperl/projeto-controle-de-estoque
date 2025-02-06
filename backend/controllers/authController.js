import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Senha incorreta" });

    const token = jwt.sign({ id: user.userid, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login bem-sucedido!", token });
};

export const signup = async (req, res) => {
    const { email, name, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        await User.create({ email, name, password: hashedPassword });
        res.json({ message: "Conta criada com sucesso!" });
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar conta", error });
    }
};
