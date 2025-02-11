import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/users") // ✅ Ajuste a rota da API se necessário
            .then(response => setUsers(response.data))
            .catch(error => console.error("Erro ao carregar usuários:", error));
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Usuários</Typography>
            <Button variant="contained" color="primary" component={Link} to="/add-user">
                Adicionar Usuário
            </Button>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.nome} - {user.email}</li>
                ))}
            </ul>
        </Container>
    );
};

export default UserList;
