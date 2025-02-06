import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001", // Ajuste a URL do backend se necessário
});

export default api;
