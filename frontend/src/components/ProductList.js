import React from "react";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, useMediaQuery } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ProductList = ({ products }) => {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <TableContainer component={Paper} sx={{ width: "100%", maxWidth: "1100px", boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Código</b></TableCell>
                            <TableCell><b>Nome</b></TableCell>
                            <TableCell><b>Categoria</b></TableCell>
                            <TableCell><b>Valor</b></TableCell>
                            <TableCell><b>Quantidade</b></TableCell>
                            <TableCell align="center"><b>Ações</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.codigo}>
                                <TableCell>{product.codigo}</TableCell>
                                <TableCell>{product.nome}</TableCell>
                                <TableCell>{product.categoria}</TableCell>
                                <TableCell>R$ {product.valor}</TableCell>
                                <TableCell>{product.quant}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" size={isMobile ? "small" : "medium"} sx={{ mx: 1 }}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" size={isMobile ? "small" : "medium"} sx={{ mx: 1 }}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ProductList;
