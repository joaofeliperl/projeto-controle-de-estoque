import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
    console.log("📩 Recebendo requisição de login:", req.body);

    const { email, password } = req.body;

    try {
        // 🔹 Verifica se os campos obrigatórios foram enviados
        if (!email || !password || typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        // 🔹 Busca o usuário pelo email no banco de dados
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log("❌ Usuário não encontrado:", email);
            return res.status(400).json({ message: "Usuário não encontrado." });
        }

        // 🔹 Verifica se a senha está cadastrada corretamente no banco
        if (!user.password) {
            console.log("❌ Erro no servidor: Senha não cadastrada para este usuário:", email);
            return res.status(500).json({ message: "Erro no servidor: Senha não cadastrada para este usuário." });
        }

        // 🔹 Compara a senha fornecida com o hash armazenado no banco de dados
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            console.log("❌ Senha incorreta para o email:", email);
            return res.status(400).json({ message: "Senha incorreta." });
        }

        // 🔹 Gera um token JWT para autenticação
        const token = jwt.sign(
            { id: user.userid, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("✅ Login bem-sucedido para:", email);
        res.json({ message: "Login bem-sucedido!", token });

    } catch (error) {
        console.error("❌ Erro no login:", error);
        res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
};

export const signup = async (req, res) => {
    console.log("📩 Recebendo requisição de signup:", req.body);

    const { email, name, password } = req.body;

    try {
        // 🔹 Verifica se todos os campos foram preenchidos corretamente
        if (!email || !name || !password || typeof email !== "string" || typeof name !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "Todos os campos são obrigatórios e devem ser strings." });
        }

        // 🔹 Verifica se o usuário já existe no banco de dados
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            console.log("❌ Tentativa de cadastro com email já existente:", email);
            return res.status(400).json({ message: "Email já cadastrado." });
        }

        // 🔹 Garante que a senha seja válida antes de criptografar
        if (password.trim() === "") {
            return res.status(400).json({ message: "A senha não pode estar vazia." });
        }

        // 🔹 Criptografa a senha antes de salvar no banco de dados
        const hashedPassword = bcrypt.hashSync(password, 10);

        // 🔹 Cria o usuário no banco de dados
        await User.create({ email, name, password: hashedPassword });

        console.log("✅ Conta criada com sucesso para:", email);
        res.json({ message: "Conta criada com sucesso!" });

    } catch (error) {
        console.error("❌ Erro no cadastro:", error);
        res.status(500).json({ message: "Erro ao criar conta", error: error.message });
    }
};
