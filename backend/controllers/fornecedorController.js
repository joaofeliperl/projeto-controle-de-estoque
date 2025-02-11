import Fornecedor from "../models/Fornecedor.js";

export const createFornecedor = async (req, res) => {
    try {
        const novoFornecedor = await Fornecedor.create(req.body);
        return res.status(201).json(novoFornecedor);
    }
    catch(error){
        console.error('Erro ao criar o fornecedor:', error);
        return res.status(500).json({error:'Erro ao criar o fornecedor'})
    }
};