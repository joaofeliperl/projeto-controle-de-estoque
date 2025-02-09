import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider } from "@mui/material";
import { Menu, Home, Inventory, ArrowDownward, ArrowUpward, ShoppingCart, People, Logout, FireTruck, LocalShipping } from "@mui/icons-material";

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    // 🔥 Função de Logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove o token de autenticação
        navigate("/login"); // Redireciona para a tela de login
    };

    return (
        <>
            {/* Ícone de menu fixo no topo esquerdo */}
            <IconButton
                onClick={toggleDrawer(true)}
                sx={{
                    position: "fixed",
                    top: 15,
                    left: 15,
                    zIndex: 3000,  // Mantém sobre o navbar
                    color: "white" // Ícone branco
                }}
            >
                <Menu />
            </IconButton>

            {/* Sidebar Drawer (Sobrepondo o Navbar) */}
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                sx={{ zIndex: 4000 }}
            >
                <List sx={{ width: 250 }}>
                    <ListItemButton onClick={() => navigate("/home")} sx={{ cursor: "pointer" }}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary="Início" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/dashboard")} sx={{ cursor: "pointer" }}>
                        <ListItemIcon><Inventory /></ListItemIcon>
                        <ListItemText primary="Produtos" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/entradas")} sx={{ cursor: "pointer" }}>
                        <ListItemIcon><ArrowDownward /></ListItemIcon>
                        <ListItemText primary="Entradas" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/saidas")} sx={{ cursor: "pointer" }}>
                        <ListItemIcon><ArrowUpward /></ListItemIcon>
                        <ListItemText primary="Saídas" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/vendas")} sx={{ cursor: "pointer" }}>
                        <ListItemIcon><ShoppingCart /></ListItemIcon>
                        <ListItemText primary="Vendas" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/fornecedores")} sx={{ cursor: "pointer" }}>
                        <ListItemIcon>< LocalShipping /></ListItemIcon>
                        <ListItemText primary="Fornecedores" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/usuarios")} sx={{ cursor: "pointer" }}>
                        <ListItemIcon><People /></ListItemIcon>
                        <ListItemText primary="Usuários" />
                    </ListItemButton>

                    <Divider sx={{ my: 2 }} /> {/* Linha separadora */}

                    {/* 🔥 Botão de Logout */}
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{
                            bgcolor: "error.main",
                            color: "white",
                            "&:hover": { bgcolor: "error.dark" }
                        }}
                    >
                        <ListItemIcon sx={{ color: "white" }}> {/* Ícone branco */}
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                    </ListItemButton>

                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;
