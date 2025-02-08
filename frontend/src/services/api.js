import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001",
});

// Intercepta respostas do backend
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token"); // Remove token expirado
            window.location.href = "/login"; // Redireciona para login
        }
        return Promise.reject(error);
    }
);

export default api;