import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, Alert } from "@mui/material";
import axios from "axios";

const Signup = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se os campos estão preenchidos
        if (!user.name || !user.email || !user.password) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5001/auth/signup", user);
            setSuccess(true);
            setError("");

            // Redireciona para login após 2 segundos
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao cadastrar. Tente novamente.");
            setSuccess(false);
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Cadastro
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>Cadastro realizado! Redirecionando...</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        name="name"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={user.name}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={user.email}
                    />
                    <TextField
                        label="Senha"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={user.password}
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
