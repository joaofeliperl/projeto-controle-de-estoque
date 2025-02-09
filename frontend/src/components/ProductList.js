import React from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Container, useMediaQuery, Tooltip
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";

const ProductList = ({ products, onView, onEdit, onDelete }) => {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Container sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <TableContainer component={Paper} sx={{ width: "100%", maxWidth: "1200px", boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><b>Código Interno</b></TableCell>
                            <TableCell><b>Nome</b></TableCell>
                            <TableCell align="center"><b>Valor de Venda</b></TableCell>
                            <TableCell align="center"><b>Estoque Atual</b></TableCell>
                            <TableCell align="center"><b>Ações</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.codigo_interno}>
                                <TableCell align="center">{product.codigo_interno}</TableCell>
                                <TableCell>{product.nome}</TableCell>
                                <TableCell align="center">R$ {product.valor_venda}</TableCell>
                                <TableCell align="center">{product.estoque_atual}</TableCell>
                                <TableCell align="center">
                                    {/* 🔍 Botão Visualizar */}
                                    <Tooltip title="Visualizar">
                                        <IconButton
                                            color="info"
                                            size={isMobile ? "small" : "medium"}
                                            sx={{ mx: 0.5 }}
                                            onClick={() => onView(product)}
                                        >
                                            <Visibility />
                                        </IconButton>
                                    </Tooltip>

                                    {/* ✏️ Botão Editar */}
                                    <Tooltip title="Editar">
                                        <IconButton
                                            color="primary"
                                            size={isMobile ? "small" : "medium"}
                                            sx={{ mx: 0.5 }}
                                            onClick={() => onEdit(product)}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>

                                    {/* 🗑️ Botão Excluir */}
                                    <Tooltip title="Excluir">
                                        <IconButton
                                            color="error"
                                            size={isMobile ? "small" : "medium"}
                                            sx={{ mx: 0.5 }}
                                            onClick={() => onDelete(product)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
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
