import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, useMediaQuery } from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

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
                    marginLeft: isMobile ? "0px" : "250px",
                    width: "100%"
                }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: isMobile ? "column" : "row",
                        marginBottom: "10px"
                    }}>
                        <Typography variant="h4" gutterBottom>
                            Produtos
                        </Typography>
                        <Box sx={{
                            display: "flex",
                            gap: 2
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                sx={{ minWidth: isMobile ? "150px" : "200px", fontSize: isMobile ? "0.75rem" : "1rem" }}
                                onClick={handleOpenDialog}
                            >
                                Adicionar Produto
                            </Button>
                            <Button
                                variant="contained"
                                color="grey"
                                startIcon={<Refresh />}
                                sx={{ minWidth: isMobile ? "150px" : "200px", fontSize: isMobile ? "0.75rem" : "1rem" }}
                                onClick={fetchProducts}
                            >
                                Atualizar
                            </Button>
                        </Box>
                    </Box>

                    {/* Componente ProductList */}
                    <ProductList products={products} />

                    {/* Diálogo para adicionar produto */}
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
