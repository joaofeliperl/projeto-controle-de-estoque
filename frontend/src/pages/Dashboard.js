import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box, Typography, Button, Dialog, useMediaQuery } from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import ProductList from "../components/ProductList";
import AddProduct from "./AddProduct";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const fetchProducts = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("❌ Token não encontrado!");
            return;
        }

        axios.get("http://localhost:5001/products", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setProducts(response.data))
            .catch(error => console.error("❌ Erro ao buscar produtos:", error));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
                        width: "100%",
                        maxWidth: "1200px",
                        marginBottom: 2
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={() => setOpenAddProduct(true)}
                            sx={{ marginRight: 2, fontSize: isMobile ? "0.75rem" : "1rem" }}
                        >
                            Adicionar Produto
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<Refresh />}
                            sx={{ fontSize: isMobile ? "0.75rem" : "1rem" }}
                            onClick={fetchProducts}
                        >
                            Atualizar
                        </Button>
                    </Box>

                    {/* 🔥 Diálogo para Adicionar Produto */}
                    <Dialog open={openAddProduct} onClose={() => setOpenAddProduct(false)} fullWidth maxWidth="md">
                        <AddProduct onClose={() => setOpenAddProduct(false)} onProductAdded={fetchProducts} />
                    </Dialog>

                    {/* 🔥 Lista de Produtos */}
                    <ProductList products={products} />
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
