import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className="mt-4">Bem-vindo ao Controle de Estoque 📦</h1>
                <ProductList />
            </div>
        </div>
    );
};

export default Dashboard;
