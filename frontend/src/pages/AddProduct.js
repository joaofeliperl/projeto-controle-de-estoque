import React, { useState, useEffect } from "react";
import {
    Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Typography, Grid
} from "@mui/material";
import { AddPhotoAlternate, Save, Cancel } from "@mui/icons-material";
import axios from "axios";

const AddProduct = ({ onClose, onProductAdded }) => {
    const [product, setProduct] = useState({
        nome: "",
        codigo_interno: Math.floor(1000000000000 + Math.random() * 9000000000000), // 🔥 Gera um código de 13 dígitos
        codigo_barras: "",
        estoque_atual: "",
        estoque_minimo: "",
        valor_venda: "",
        valor_custo: "",
        fornecedor_id: "",
        observacoes: "",
        imagens: []
    });

    const [fornecedores, setFornecedores] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:5001/fornecedores", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setFornecedores(response.data))
            .catch(error => console.error("Erro ao carregar fornecedores:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files.length > 4) {
            alert("Você pode enviar no máximo 4 imagens!");
            return;
        }
        setProduct({ ...product, imagens: Array.from(files) }); // 🔥 Alterado para "Array.from"
    };

    const handleSubmit = () => {
        if (!product.nome || !product.estoque_atual || !product.valor_venda) {
            alert("Preencha os campos obrigatórios!");
            return;
        }

        const formData = new FormData();
        Object.keys(product).forEach(key => {
            if (key !== "imagens") {
                formData.append(key, product[key]);
            }
        });

        // 🔥 Certificando que o nome do campo é "imagens" (o mesmo do multer)
        product.imagens.forEach((file) => {
            formData.append("imagens", file);
        });

        axios.post("http://localhost:5001/products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(() => {
                alert("Produto cadastrado com sucesso!");
                onProductAdded();
                onClose();
            })
            .catch(error => console.error("Erro ao cadastrar produto:", error));
    };

    return (
        <Box sx={{ maxWidth: "800px", mx: "auto", p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
                Criar ou Editar Produto
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth label="Nome do Produto *" name="nome" value={product.nome} onChange={handleChange} required />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth label="Código Interno" value={product.codigo_interno} disabled />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Código de Barras" name="codigo_barras" value={product.codigo_barras} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth label="Estoque Atual *" name="estoque_atual" type="number" value={product.estoque_atual} onChange={handleChange} required />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Estoque Mínimo" name="estoque_minimo" type="number" value={product.estoque_minimo} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth label="Valor de Venda *" name="valor_venda" type="number" value={product.valor_venda} onChange={handleChange} required />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Valor de Custo" name="valor_custo" type="number" value={product.valor_custo} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Fornecedor</InputLabel>
                        <Select name="fornecedor_id" value={product.fornecedor_id} onChange={handleChange}>
                            <MenuItem value="">Nenhum</MenuItem>
                            {fornecedores.map(f => (
                                <MenuItem key={f.id} value={f.id}>{f.nome}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* 🔥 Observações */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Observações"
                        name="observacoes"
                        multiline
                        rows={3}
                        value={product.observacoes}
                        onChange={handleChange}
                    />
                </Grid>

                {/* 🔥 Upload de Imagens */}
                <Grid item xs={12}>
                    <Button variant="contained" component="label" startIcon={<AddPhotoAlternate />}>
                        Enviar Imagens
                        <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
                    </Button>
                    {product.imagens.length > 0 && (
                        <Typography variant="caption" sx={{ ml: 2 }}>
                            {product.imagens.length} imagem(ns) selecionada(s)
                        </Typography>
                    )}
                </Grid>

                {/* 🔥 Pré-visualização das imagens */}
                <Grid item xs={12} sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {imagePreviews.map((src, index) => (
                        <img key={index} src={src} alt={`Preview ${index + 1}`} width="100" height="100" style={{ borderRadius: 8, objectFit: "cover" }} />
                    ))}
                </Grid>

                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button variant="contained" color="secondary" startIcon={<Cancel />} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" startIcon={<Save />} onClick={handleSubmit}>
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddProduct;
