import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, useMediaQuery
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newProduct, setNewProduct] = useState({ nome: "", categoria: "", valor: "", quantidade: "" });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        axios.get("http://localhost:5001/products")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Erro ao buscar produtos:", error));
    }, []);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = () => {
        axios.post("http://localhost:5001/products", newProduct)
            .then(response => {
                setProducts([...products, response.data]);
                handleCloseDialog();
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

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            sx={{ marginBottom: "10px", minWidth: isMobile ? "150px" : "200px", fontSize: isMobile ? "0.75rem" : "1rem" }}
                            onClick={handleOpenDialog}
                        >
                            Adicionar Produto
                        </Button>
                    </Box>

                    {/* Tabela de Produtos */}
                    <TableContainer component={Paper} sx={{ width: "100%", maxWidth: "1200px", marginTop: 1 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Código</b></TableCell>
                                    <TableCell><b>Nome</b></TableCell>
                                    <TableCell><b>Categoria</b></TableCell>
                                    <TableCell><b>Valor</b></TableCell>
                                    <TableCell><b>Quantidade</b></TableCell>
                                    <TableCell><b>Ações</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.codigo}>
                                        <TableCell>{product.codigo}</TableCell>
                                        <TableCell>{product.nome}</TableCell>
                                        <TableCell>{product.categoria}</TableCell>
                                        <TableCell>R$ {product.valor.toFixed(2)}</TableCell>
                                        <TableCell>{product.quantidade}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary" size="small">
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" size="small">
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

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
