import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EstadoSelect from "../components/EstadoSelect"; // Importando o select de estados

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
        <Container>
            <Typography variant="h4" gutterBottom>Cadastrar Fornecedor</Typography>
            <form onSubmit={handleSubmit}>
                {Object.keys(fornecedor).map((key) => (
                    key === "estado" ? ( // Se for o campo estado, usa o select
                        <EstadoSelect
                            key={key}
                            value={fornecedor[key]}
                            onChange={handleChange}
                        />
                    ) : (
                        <TextField 
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            name={key}
                            value={fornecedor[key]}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    )
                ))}
                <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
            </form>
        </Container>
    );
};

export default AddProvider;
