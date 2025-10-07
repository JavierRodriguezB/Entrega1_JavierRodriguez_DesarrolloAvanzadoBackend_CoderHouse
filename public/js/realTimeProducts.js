// Inicializar Socket.IO
const socket = io();

// Elementos del DOM
const productForm = document.getElementById('product-form');
let productsList = document.getElementById('products-list');
const productCount = document.getElementById('product-count');
const connectionStatus = document.getElementById('connection-status');
let noProducts = document.getElementById('no-products');

// Estado de conexión
socket.on('connect', () => {
    console.log('Conectado al servidor');
    connectionStatus.innerHTML = '<i class="fas fa-circle text-success"></i> Conectado';
    connectionStatus.className = 'badge bg-success fs-6';
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    connectionStatus.innerHTML = '<i class="fas fa-circle text-danger"></i> Desconectado';
    connectionStatus.className = 'badge bg-danger fs-6';
});

// Escuchar nuevos productos
socket.on('productAdded', (product) => {
    console.log('Evento productAdded recibido:', product);
    try {
        addProductToDOM(product);
        updateProductCount();
        showNotification('Producto agregado exitosamente', 'success');
    } catch (error) {
        console.error('Error al procesar productAdded:', error);
        showNotification('Error al agregar producto', 'error');
    }
});

// Escuchar productos eliminados
socket.on('productDeleted', (productId) => {
    console.log('Evento productDeleted recibido:', productId);
    try {
        removeProductFromDOM(productId);
        updateProductCount();
        showNotification('Producto eliminado exitosamente', 'info');
    } catch (error) {
        console.error('Error al procesar productDeleted:', error);
        showNotification('Error al eliminar producto', 'error');
    }
});

// Escuchar errores del servidor
socket.on('error', (error) => {
    console.error('Error del servidor:', error);
    showNotification(error.message, 'error');
});

// Manejar envío del formulario
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(productForm);
    const productData = {
        title: formData.get('title'),
        code: formData.get('code'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        status: formData.get('status') ? true : false,
        stock: parseInt(formData.get('stock')),
        category: formData.get('category'),
        thumbnails: (formData.get('thumbnail') ? [formData.get('thumbnail')] : [])
    };
    
    console.log('Enviando producto via WebSocket:', productData);
    
    // Validar datos antes de enviar
    if (!productData.title || !productData.code || !productData.description || !productData.price || !productData.stock || !productData.category) {
        showNotification('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
    // Enviar producto via WebSocket
    socket.emit('addProduct', productData);
    
    // Limpiar formulario
    productForm.reset();
    
    // Mostrar notificación de envío
    showNotification('Enviando producto...', 'info');
});

// Función para eliminar producto
function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        socket.emit('deleteProduct', productId);
    }
}

// Función para agregar producto al DOM
function addProductToDOM(product) {
    console.log('Agregando producto al DOM:', product);
    const productCard = createProductCard(product);
    
    // Remover mensaje de "no hay productos" si existe
    const noProductsElement = document.getElementById('no-products');
    if (noProductsElement) {
        noProductsElement.remove();
    }
    
    // Obtener o crear la lista de productos
    let productsListElement = document.getElementById('products-list');
    if (!productsListElement) {
        const container = document.getElementById('products-container');
        productsListElement = document.createElement('div');
        productsListElement.className = 'row';
        productsListElement.id = 'products-list';
        container.appendChild(productsListElement);
    }
    
    // Agregar el nuevo producto
    productsListElement.insertAdjacentHTML('beforeend', productCard);
    
    // Actualizar referencias
    productsList = productsListElement;
    noProducts = null;
}

// Función para remover producto del DOM
function removeProductFromDOM(productId) {
    console.log('Removiendo producto del DOM:', productId);
    const productElement = document.querySelector(`[data-product-id="${productId}"]`);
    if (productElement) {
        productElement.remove();
        
        // Verificar si quedan productos
        const productsListElement = document.getElementById('products-list');
        if (productsListElement && productsListElement.children.length === 0) {
            const container = document.getElementById('products-container');
            const noProductsMsg = `
                <div class="text-center py-5" id="no-products">
                    <i class="fas fa-box-open fa-5x text-muted mb-4"></i>
                    <h3 class="text-muted">No hay productos disponibles</h3>
                    <p class="text-muted">Agrega tu primer producto usando el formulario de arriba.</p>
                </div>
            `;
            container.innerHTML = noProductsMsg;
            noProducts = document.getElementById('no-products');
        }
    }
}

// Función para crear tarjeta de producto
function createProductCard(product) {
    return `
        <div class="col-lg-4 col-md-6 mb-4" data-product-id="${product.id}">
            <div class="card product-card h-100 shadow-sm">
                <div class="card-header bg-light d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">
                        <i class="fas fa-tag text-primary"></i>
                        ${product.title}
                    </h5>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct('${product.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="mb-3">
                        <img src="${(product.thumbnails && product.thumbnails[0]) ? product.thumbnails[0] : (product.thumbnail || 'https://via.placeholder.com/300x200?text=Sin+Imagen')}" 
                             alt="${product.title}" 
                             class="img-fluid rounded"
                             style="max-height: 200px; object-fit: cover; width: 100%;"
                             onerror="this.src='https://via.placeholder.com/300x200?text=Sin+Imagen'">
                    </div>
                    
                    <p class="card-text text-muted flex-grow-1">
                        ${product.description}
                    </p>
                    
                    <div class="mt-auto">
                        <div class="row text-center mb-3">
                            <div class="col-6">
                                <small class="text-muted">Precio</small>
                                <div class="h5 text-success mb-0">$${product.price}</div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted">Stock</small>
                                <div class="h5 text-info mb-0">${product.stock}</div>
                            </div>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-secondary">${product.category}</span>
                            <small class="text-muted">ID: ${product.id}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para actualizar contador de productos
function updateProductCount() {
    const productsListElement = document.getElementById('products-list');
    const count = productsListElement ? productsListElement.children.length : 0;
    if (productCount) {
        productCount.textContent = count;
    }
    console.log('Contador de productos actualizado:', count);
}

// Función para mostrar notificaciones
function showNotification(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'info' ? 'info' : 'danger'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'info' ? 'info' : 'exclamation-triangle'}"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}