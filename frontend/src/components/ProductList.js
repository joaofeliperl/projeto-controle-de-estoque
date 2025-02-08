import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ProductList = ({ products }) => {
    return (
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
                            <TableCell>R$ {product.valor}</TableCell>
                            <TableCell>{product.quant}</TableCell>
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
    );
};

export default ProductList;
