import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Navbar = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar>
                {/* Empurrando o título para a direita */}
                <Box sx={{ flexGrow: 1 }}></Box>

                <Typography variant="h6" noWrap sx={{ textAlign: "right", paddingRight: 2 }}>
                    Controle de Estoque
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
