document.addEventListener('DOMContentLoaded', function () {
    loadProducts();

    // Adicionar produto
    document.getElementById('addProductForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const categoria = document.getElementById('categoria').value;
        const valor = document.getElementById('valor').value;
        const quantidade = document.getElementById('quantidade').value;

        fetch('/add_product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, categoria, valor, quantidade })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                loadProducts();
                document.getElementById('addProductForm').reset();
                var modalEl = document.getElementById('addProductModal');
                var modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) {
                    modal.hide();
                }
            })
            .catch(error => console.error('Erro ao adicionar o produto:', error));
    });

    // Função para abrir o modal de atualização
    document.getElementById('updateProductForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const codigo = document.getElementById('updateProductForm').dataset.codigo;
        const nome = document.getElementById('updateNome').value;
        const categoria = document.getElementById('updateCategoria').value;
        const valor = document.getElementById('updateValor').value;
        const quantidade = document.getElementById('updateQuantidade').value;

        fetch(`/update_product/${codigo}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, categoria, valor, quantidade })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                loadProducts();
                var modalEl = document.getElementById('updateProductModal');
                var modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) {
                    modal.hide();
                }
            })
            .catch(error => console.error('Erro ao atualizar o produto:', error));
    });

    // Função de pesquisa
    document.getElementById('search').addEventListener('input', function () {
        const searchValue = this.value.toLowerCase();
        const rows = document.querySelectorAll('#productTable tr');
        rows.forEach(row => {
            const values = Array.from(row.querySelectorAll('td')).map(td => td.innerText.toLowerCase());
            if (values.some(value => value.includes(searchValue))) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

// Função para carregar os produtos do backend
function loadProducts() {
    fetch('/get_products')
        .then(response => response.json())
        .then(data => {
            const productTable = document.getElementById('productTable');
            productTable.innerHTML = '';
            data.forEach(product => {
                productTable.innerHTML += `
                    <tr>
                        <td>${product.codigo}</td>
                        <td>${product.nome}</td>
                        <td>${product.categoria}</td>
                        <td>R$ ${product.valor}</td>
                        <td>${product.quantidade}</td>  
                        <td>R$ ${product.total}</td>
                        <td>
                            <button class="btn btn-danger" onclick="deleteProduct(${product.codigo})">Excluir</button>
                            <button class="btn btn-warning" onclick="editProduct(${product.codigo}, '${product.nome}', '${product.categoria}', ${product.valor}, ${product.quantidade})">Atualizar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
}

// Função para excluir um produto
function deleteProduct(codigo) {
    fetch(`/delete_product/${codigo}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadProducts();
        })
        .catch(error => console.error('Erro ao excluir o produto:', error));
}

// Função para abrir o modal de atualização com os dados preenchidos
function editProduct(codigo, nome, categoria, valor, quantidade) {
    document.getElementById('updateNome').value = nome;
    document.getElementById('updateCategoria').value = categoria;
    document.getElementById('updateValor').value = valor;
    document.getElementById('updateQuantidade').value = quantidade;
    document.getElementById('updateProductForm').dataset.codigo = codigo;

    var modalEl = document.getElementById('updateProductModal');
    var modal = new bootstrap.Modal(modalEl);
    modal.show();
}
