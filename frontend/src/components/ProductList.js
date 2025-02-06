import React, { useEffect, useState } from "react";
import api from "../services/api";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Erro ao buscar produtos:", error));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Lista de Produtos</h2>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.codigo}>
                            <td>{product.codigo}</td>
                            <td>{product.nome}</td>
                            <td>{product.categoria}</td>
                            <td>R$ {product.valor.toFixed(2)}</td>
                            <td>{product.quantidade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
