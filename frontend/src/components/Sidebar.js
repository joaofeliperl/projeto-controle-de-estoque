import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, Divider } from "@mui/material";
import { Menu, Home, Inventory, Settings, Logout } from "@mui/icons-material";

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
                sx={{
                    zIndex: 4000 // Faz com que o Sidebar fique acima de tudo
                }}
            >
                <List sx={{ width: 250 }}>
                    <ListItem button onClick={() => navigate("/dashboard")}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>

                    <ListItem button onClick={() => navigate("/dashboard")}>
                        <ListItemIcon>
                            <Inventory />
                        </ListItemIcon>
                        <ListItemText primary="Produtos" />
                    </ListItem>

                    <ListItem button onClick={() => navigate("/dashboard")}>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Configurações" />
                    </ListItem>

                    <Divider sx={{ my: 2 }} /> {/* Linha separadora */}

                    {/* 🔥 Botão de Logout */}
                    <ListItem>
                        <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            startIcon={<Logout />}
                            onClick={handleLogout}
                        >
                            Sair
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;
