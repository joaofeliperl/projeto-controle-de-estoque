import React from "react";
import { Box, Paper, Typography, Container, Grid } from "@mui/material";
import { Inventory, Login, ShoppingCart, ExitToApp, People, Assessment, Feedback } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
    const navigate = useNavigate();

    const menuItems = [
        { title: "Produtos", description: "Cadastro de produtos", icon: <Inventory fontSize="large" />, path: "/dashboard" },
        { title: "Entradas", description: "Gerenciar entradas de produtos", icon: <Login fontSize="large" />, path: "/entradas" },
        { title: "Saídas", description: "Gerenciar saídas de produtos", icon: <ExitToApp fontSize="large" />, path: "/saidas" },
        { title: "Vendas", description: "Gerenciar vendas", icon: <ShoppingCart fontSize="large" />, path: "/vendas" },
        { title: "Usuários", description: "Gerenciar usuários", icon: <People fontSize="large" />, path: "/usuarios" },
        { title: "Feedback", description: "Deixe seu feedback", icon: <Feedback fontSize="large" />, path: "/feedback" },
    ];

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", marginTop: "64px" }}>
                <Sidebar />
                <Container sx={{ flexGrow: 1, padding: 3, marginLeft: { xs: 0, md: "250px" }, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h4" gutterBottom>
                        Atalhos
                    </Typography>
                    <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ maxWidth: "900px" }}>
                        {menuItems.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
                                <Paper
                                    sx={{
                                        padding: 3,
                                        textAlign: "center",
                                        cursor: "pointer",
                                        transition: "0.3s",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: "8px",
                                        boxShadow: 2,
                                        width: "220px",
                                        height: "150px",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                            backgroundColor: "#e3e3e3"
                                        }
                                    }}
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.icon}
                                    <Typography variant="h6" sx={{ marginTop: 1, fontWeight: "bold", color: "#1976d2" }}>{item.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Home;
