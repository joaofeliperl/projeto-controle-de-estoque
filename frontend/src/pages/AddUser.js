import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
    const [user, setUser] = useState({ nome: "", email: "", senha: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5001/users", user);
            alert("Usuário cadastrado com sucesso!");
            navigate("/users");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário!");
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Cadastrar Usuário</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Nome" name="nome" value={user.nome} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="E-mail" name="email" type="email" value={user.email} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Senha" name="senha" type="password" value={user.senha} onChange={handleChange} fullWidth margin="normal" required />
                <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
            </form>
        </Container>
    );
};

export default AddUser;
