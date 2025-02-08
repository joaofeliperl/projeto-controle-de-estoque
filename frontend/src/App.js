import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
    return (
        <Router>
            <AuthRedirect /> {/* Redirecionamento automático */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

// 🔥 Componente para redirecionamento automático
const AuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login"); // Se não estiver logado, vai para login
        } else {
            navigate("/dashboard"); // Se estiver logado, vai para dashboard
        }
    }, [navigate]);

    return null; // Esse componente não precisa renderizar nada
};

export default App;
