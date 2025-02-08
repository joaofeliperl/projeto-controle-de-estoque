import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Menu, Home, Inventory, Settings } from "@mui/icons-material";

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state) => () => {
        setOpen(state);
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
                    <ListItem button onClick={toggleDrawer(false)}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>

                    <ListItem button onClick={toggleDrawer(false)}>
                        <ListItemIcon>
                            <Inventory />
                        </ListItemIcon>
                        <ListItemText primary="Produtos" />
                    </ListItem>

                    <ListItem button onClick={toggleDrawer(false)}>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Configurações" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;
