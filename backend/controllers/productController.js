import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
};

export const addProduct = async (req, res) => {
    const { nome, categoria, valor, quant } = req.body;

    try {
        const product = await Product.create({ nome, categoria, valor, quant });
        res.json({ message: "Produto adicionado com sucesso!", product });
    } catch (error) {
        res.status(400).json({ message: "Erro ao adicionar produto", error });
    }
};

export const updateProduct = async (req, res) => {
    const { codigo } = req.params;
    const { nome, categoria, valor, quantidade } = req.body;

    try {
        await Product.update({ nome, categoria, valor, quant: quantidade }, { where: { codigo } });
        res.json({ message: "Produto atualizado com sucesso!" });
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar produto", error });
    }
};

export const deleteProduct = async (req, res) => {
    const { codigo } = req.params;
    await Product.destroy({ where: { codigo } });
    res.json({ message: "Produto excluído com sucesso!" });
};
