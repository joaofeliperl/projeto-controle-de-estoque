import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import ProductList from "../components/ProductList"; // 🔥 Importando a tabela separada

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newProduct, setNewProduct] = useState({ nome: "", categoria: "", valor: "", quantidade: "" });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const fetchProducts = () => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:5001/products", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setProducts(response.data))
            .catch(error => console.error("Erro ao buscar produtos:", error));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = () => {
        const token = localStorage.getItem("token");
        const formattedProduct = {
            nome: newProduct.nome,
            categoria: newProduct.categoria,
            valor: newProduct.valor,
            quant: newProduct.quantidade
        };

        axios.post("http://localhost:5001/products", formattedProduct, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                handleCloseDialog();
                fetchProducts();
            })
            .catch(error => console.error("Erro ao adicionar produto:", error));
    };

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", marginTop: "64px" }}>
                <Sidebar />
                <Box component="main" sx={{
                    flexGrow: 1,
                    p: 3,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography variant="h4" gutterBottom>
                        Produtos
                    </Typography>

                    {/* 🔥 Botões alinhados à direita */}
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 2,
                        width: "100%",
                        maxWidth: "1200px"
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            sx={{ minWidth: "150px", marginRight: 2 }}
                            onClick={handleOpenDialog}
                        >
                            Adicionar Produto
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<Refresh />}
                            sx={{ minWidth: "150px" }}
                            onClick={fetchProducts}
                        >
                            Atualizar
                        </Button>
                    </Box>

                    {/* 🔥 Agora usamos o ProductList.js para renderizar a tabela */}
                    <ProductList products={products} />

                    {/* 🔥 Diálogo para adicionar produto */}
                    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                        <DialogTitle>Adicionar Produto</DialogTitle>
                        <DialogContent>
                            <TextField fullWidth margin="dense" label="Nome" name="nome" onChange={handleChange} />
                            <TextField fullWidth margin="dense" label="Categoria" name="categoria" onChange={handleChange} />
                            <TextField fullWidth margin="dense" label="Valor" name="valor" type="number" onChange={handleChange} />
                            <TextField fullWidth margin="dense" label="Quantidade" name="quantidade" type="number" onChange={handleChange} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="secondary">Cancelar</Button>
                            <Button onClick={handleSubmit} color="primary" variant="contained">Salvar</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
