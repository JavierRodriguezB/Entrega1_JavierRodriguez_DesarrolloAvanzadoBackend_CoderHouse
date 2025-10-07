const socket = io();
const status = document.getElementById('status');
const log = document.getElementById('log');
const productForm = document.getElementById('productForm');
const productsDiv = document.getElementById('products');

function addLog(message) {
    const div = document.createElement('div');
    div.textContent = new Date().toLocaleTimeString() + ' - ' + message;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

// Estado de conexión
socket.on('connect', () => {
    status.textContent = 'Estado: Conectado';
    status.className = 'status connected';
    addLog('Conectado al servidor WebSocket');
});

socket.on('disconnect', () => {
    status.textContent = 'Estado: Desconectado';
    status.className = 'status disconnected';
    addLog('Desconectado del servidor WebSocket');
});

// Eventos de productos
socket.on('productAdded', (product) => {
    addLog('Producto agregado: ' + JSON.stringify(product));
    addProductToDOM(product);
});

socket.on('productDeleted', (productId) => {
    addLog('Producto eliminado: ' + productId);
    removeProductFromDOM(productId);
});

socket.on('error', (error) => {
    addLog('Error: ' + error.message);
});

// Manejar formulario
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const productData = {
        title: document.getElementById('title').value,
        code: document.getElementById('code').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        status: document.getElementById('status').checked,
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value,
        thumbnails: (document.getElementById('thumbnail').value ? [document.getElementById('thumbnail').value] : [])
    };
    
    addLog('Enviando producto: ' + JSON.stringify(productData));
    socket.emit('addProduct', productData);
    
    productForm.reset();
});

function addProductToDOM(product) {
    const productDiv = document.createElement('div');
    productDiv.id = 'product-' + product.id;
    productDiv.style.border = '1px solid #ddd';
    productDiv.style.padding = '10px';
    productDiv.style.margin = '10px 0';
    productDiv.style.borderRadius = '5px';
    
    productDiv.innerHTML = `
        <h4>${product.title}</h4>
        <p>${product.description}</p>
        <p><strong>Precio:</strong> $${product.price}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p><strong>Categoría:</strong> ${product.category}</p>
        <p><strong>ID:</strong> ${product.id}</p>
        <button onclick="deleteProduct(${product.id})">Eliminar</button>
    `;
    
    productsDiv.appendChild(productDiv);
}

function removeProductFromDOM(productId) {
    const productDiv = document.getElementById('product-' + productId);
    if (productDiv) {
        productDiv.remove();
    }
}

function deleteProduct(productId) {
    if (confirm('¿Eliminar producto ' + productId + '?')) {
        addLog('Eliminando producto: ' + productId);
        socket.emit('deleteProduct', productId);
    }
}

addLog('Página cargada, esperando conexión...');