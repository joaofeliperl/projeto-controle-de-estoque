import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EstadoSelect from "../components/EstadoSelect"; // ✅ Select de Estados
import Navbar from "../components/Navbar"; // ✅ Navbar adicionada
import Sidebar from "../components/Sidebar"; // ✅ Sidebar adicionada

const AddProvider = () => {
    const [fornecedor, setFornecedor] = useState({
        nome: "",
        email: "",
        cnpj: "",
        celular: "",
        telefone: "",
        cep: "",
        bairro: "",
        cidade: "",
        estado: "", // Estado inicia vazio
        rua: "",
        numero: "",
        complemento: "",
        observacoes: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFornecedor({ ...fornecedor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5001/fornecedores", fornecedor);
            alert("Fornecedor cadastrado com sucesso!");
            navigate("/fornecedores");
        } catch (error) {
            console.error("Erro ao cadastrar fornecedor:", error);
            alert("Erro ao cadastrar fornecedor!");
        }
    };

    return (
        <>
            <Navbar /> {/* ✅ Navbar adicionada */}
            <Box sx={{ display: "flex", marginTop: "64px" }}>
                <Sidebar /> {/* ✅ Sidebar adicionada */}

                <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
                    <Container maxWidth="md">
                        <Typography variant="h4" gutterBottom>
                            Cadastrar Fornecedor
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {Object.keys(fornecedor).map((key) => (
                                    <Grid item xs={12} sm={key === "observacoes" ? 12 : 6} key={key}>
                                        {key === "estado" ? (
                                            <EstadoSelect
                                                value={fornecedor[key]}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <TextField
                                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                                name={key}
                                                value={fornecedor[key]}
                                                onChange={handleChange}
                                                fullWidth
                                                multiline={key === "observacoes"} // ✅ Observações maiores
                                                rows={key === "observacoes" ? 4 : 1}
                                            />
                                        )}
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Botão de envio */}
                            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Cadastrar
                                </Button>
                            </Box>
                        </form>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default AddProvider;
