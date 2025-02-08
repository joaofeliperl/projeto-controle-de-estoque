import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { jwtDecode } from "jwt-decode";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<AuthRedirect />} />
            </Routes>
        </Router>
    );
};


const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000; // Tempo atual em segundos

            if (decoded.exp < now) {
                localStorage.removeItem("token"); // Remove o token expirado
                navigate("/login");
            }
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
            localStorage.removeItem("token"); // Remove se o token for inválido
            navigate("/login");
        }
    }, [navigate, token]);

    return token ? children : null;
};

const AuthRedirect = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;

                if (decoded.exp < now) {
                    localStorage.removeItem("token"); // Remove o token expirado
                    navigate("/login");
                } else {
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error("Erro ao decodificar token:", error);
                localStorage.removeItem("token"); // Remove se for inválido
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [navigate, token]);

    return null;
};


export default App;
