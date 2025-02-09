import React, { useState, useEffect } from "react";
import {
    Box, Button, Typography, Grid, IconButton
} from "@mui/material";
import { Save, Cancel, Autorenew } from "@mui/icons-material";
import axios from "axios";
import SnackbarAlert from "../components/SnackbarAlert";
import TextFieldWrapper from "../components/TextFieldWrapper"; // ✅ Campo de Texto Customizado
import FornecedorSelect from "../components/FornecedorSelect"; // ✅ Seleção de Fornecedor
import ImageUploader from "../components/ImageUploader"; // ✅ Upload de Imagens

const AddProduct = ({ onClose, onProductAdded }) => {
    const generateCodigoInterno = () => Math.floor(1000000000000 + Math.random() * 9000000000000).toString();

    const [product, setProduct] = useState({
        nome: "",
        codigo_interno: generateCodigoInterno(),
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
    const [margemLucro, setMargemLucro] = useState(""); // ✅ Estado para margem de lucro
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        axios.get("http://localhost:5001/fornecedores", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(response => setFornecedores(response.data))
            .catch(error => console.error("Erro ao carregar fornecedores:", error));
    }, []);

    // Atualiza os campos e recalcula a margem de lucro
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newProduct = { ...product, [name]: value };

        // Recalcula margem de lucro
        if (name === "valor_venda" || name === "valor_custo") {
            const custo = parseFloat(newProduct.valor_custo) || 0;
            const venda = parseFloat(newProduct.valor_venda) || 0;

            if (custo > 0 && venda > 0) {
                setMargemLucro(((venda - custo) / custo * 100).toFixed(2) + "%");
            } else {
                setMargemLucro("");
            }
        }

        setProduct(newProduct);
    };

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files.length > 4) {
            setSnackbar({ open: true, message: "Você pode enviar no máximo 4 imagens!", severity: "warning" });
            return;
        }

        setProduct({ ...product, imagens: Array.from(files) });
    };

    const handleSubmit = () => {
        axios.post("http://localhost:5001/products", product, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(() => {
                setSnackbar({ open: true, message: "Produto cadastrado com sucesso!", severity: "success" });
                setTimeout(() => {
                    onClose();
                    onProductAdded();
                }, 1000);
            })
            .catch(() => {
                setSnackbar({ open: true, message: "Erro ao cadastrar produto!", severity: "error" });
            });
    };

    return (
        <Box sx={{ maxWidth: "800px", mx: "auto", p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5">Criar ou Editar Produto</Typography>

            <Grid container spacing={2}>
                {/* Código Interno - Read Only */}
                <Grid item xs={10}>
                    <TextFieldWrapper label="Código Interno" name="codigo_interno" value={product.codigo_interno} readOnly />
                </Grid>
                <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="primary" onClick={() => setProduct({ ...product, codigo_interno: generateCodigoInterno() })}>
                        <Autorenew />
                    </IconButton>
                </Grid>

                {/* Outros campos */}
                <TextFieldWrapper label="Nome do Produto *" name="nome" value={product.nome} onChange={handleChange} required />
                <TextFieldWrapper label="Código de Barras" name="codigo_barras" value={product.codigo_barras} onChange={handleChange} />
                <TextFieldWrapper label="Estoque Atual *" name="estoque_atual" type="number" value={product.estoque_atual} onChange={handleChange} required />
                <TextFieldWrapper label="Estoque Mínimo" name="estoque_minimo" type="number" value={product.estoque_minimo} onChange={handleChange} />

                <TextFieldWrapper label="Valor de Venda *" name="valor_venda" type="number" value={product.valor_venda} onChange={handleChange} required />
                <TextFieldWrapper label="Valor de Custo" name="valor_custo" type="number" value={product.valor_custo} onChange={handleChange} />

                {/* Margem de Lucro - Read Only */}
                <Grid item xs={6}>
                    <TextFieldWrapper
                        label="Margem de Lucro (%)"
                        name="margem_lucro"
                        value={margemLucro}
                        readOnly
                    />
                </Grid>

                {/* Seleção de Fornecedor */}
                <FornecedorSelect fornecedores={fornecedores} value={product.fornecedor_id} onChange={handleChange} />

                {/* Observações */}
                <Grid item xs={12}>
                    <TextFieldWrapper label="Observações" name="observacoes" value={product.observacoes} onChange={handleChange} multiline rows={3} />
                </Grid>

                {/* Upload de Imagens */}
                <ImageUploader onUpload={handleImageUpload} imageCount={product.imagens.length} />

                {/* Botões */}
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button variant="contained" color="error" startIcon={<Cancel />} onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" color="primary" startIcon={<Save />} onClick={handleSubmit}>Salvar</Button>
                </Grid>
            </Grid>

            <SnackbarAlert open={snackbar.open} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.message} severity={snackbar.severity} />
        </Box>
    );
};

export default AddProduct;
