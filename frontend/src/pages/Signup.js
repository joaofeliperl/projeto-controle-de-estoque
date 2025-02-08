import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

const Signup = () => {
    const [user, setUser] = useState({ nome: "", email: "", senha: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5001/auth/signup", user);
            navigate("/login");
        } catch (err) {
            setError("Erro ao cadastrar. Tente novamente.");
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Cadastro
                </Typography>
                {error && <Typography color="error" align="center">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        name="nome"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Senha"
                        name="senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Cadastrar
                    </Button>
                </form>
                <Typography align="center" sx={{ mt: 2 }}>
                    Já tem uma conta? <Link to="/login">Faça login</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Signup;
