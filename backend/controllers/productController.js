import Product from "../models/Product.js";
import upload from "../middleware/multerConfig.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar produtos", error });
    }
};

export const addProduct = async (req, res) => {
    console.log("🟢 Recebendo requisição para adicionar produto...");

    upload(req, res, async (err) => {
        if (err) {
            console.error("❌ Erro no upload das imagens:", err);
            return res.status(400).json({ message: "Erro no upload das imagens", error: err });
        }

        console.log("📂 Arquivos recebidos:", req.files);
        console.log("📥 Dados recebidos:", req.body);

        const { nome, codigo_barras, estoque_atual, estoque_minimo, valor_venda, valor_custo, fornecedor_id, observacoes } = req.body;

        // Validar se os campos obrigatórios estão presentes
        if (!nome || !estoque_atual || !valor_venda) {
            console.error("❌ Campos obrigatórios faltando:", { nome, estoque_atual, valor_venda });
            return res.status(400).json({ message: "Os campos nome, estoque atual e valor de venda são obrigatórios!" });
        }

        // Pegando os nomes das imagens enviadas
        const imagens = req.files ? req.files.map(file => file.filename) : [];

        try {
            const product = await Product.create({
                nome,
                codigo_barras,
                estoque_atual,
                estoque_minimo,
                valor_venda,
                valor_custo,
                fornecedor_id,
                observacoes,
                imagem1: imagens[0] || null,
                imagem2: imagens[1] || null,
                imagem3: imagens[2] || null,
                imagem4: imagens[3] || null
            });

            console.log("✅ Produto adicionado com sucesso:", product);
            res.json({ message: "Produto adicionado com sucesso!", product });
        } catch (error) {
            console.error("❌ Erro ao adicionar produto:", error);
            res.status(400).json({ message: "Erro ao adicionar produto", error });
        }
    });
};


export const updateProduct = async (req, res) => {
    try {
        const { codigo } = req.params;
        const { nome, codigo_barras, estoque_atual, estoque_minimo, valor_venda, valor_custo, fornecedor_id, observacoes } = req.body;

        // 🔥 Verifica se novas imagens foram enviadas
        const imagens = req.files ? req.files.map(file => file.filename) : [];

        const updatedFields = {
            nome,
            codigo_barras,
            estoque_atual,
            estoque_minimo,
            valor_venda,
            valor_custo,
            fornecedor_id,
            observacoes
        };

        // 🔥 Atualiza apenas os campos de imagem se novas imagens forem enviadas
        if (imagens.length > 0) {
            updatedFields.imagem1 = imagens[0] || null;
            updatedFields.imagem2 = imagens[1] || null;
            updatedFields.imagem3 = imagens[2] || null;
            updatedFields.imagem4 = imagens[3] || null;
        }

        await Product.update(updatedFields, { where: { id: codigo } });

        res.json({ message: "✅ Produto atualizado com sucesso!" });
    } catch (error) {
        res.status(400).json({ message: "❌ Erro ao atualizar produto", error });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { codigo } = req.params;
        await Product.destroy({ where: { id: codigo } });

        res.json({ message: "✅ Produto excluído com sucesso!" });
    } catch (error) {
        res.status(400).json({ message: "❌ Erro ao excluir produto", error });
    }
};
