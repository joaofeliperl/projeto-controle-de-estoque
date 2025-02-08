import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("📩 Enviando dados de login:", credentials); // Log para verificar os dados enviados

        try {
            const response = await axios.post("http://localhost:5001/auth/login", credentials);
            console.log("✅ Resposta do backend:", response.data); // Log da resposta

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            console.error("❌ Erro ao fazer login:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Erro ao tentar fazer login.");
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                {error && <Typography color="error" align="center">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        label="Senha"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Entrar
                    </Button>
                </form>
                <Typography align="center" sx={{ mt: 2 }}>
                    Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
