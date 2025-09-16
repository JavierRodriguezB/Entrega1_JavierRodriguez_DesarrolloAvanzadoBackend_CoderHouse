const app = require('./src/app');
const { createServer } = require('http');
const { Server } = require('socket.io');

const PORT = 8080;

// Crear servidor HTTP
const server = createServer(app);

// Configurar Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Hacer io disponible globalmente
app.set('io', io);

// Importar servicios
const productService = require('./src/services/productService');

// Configurar eventos de Socket.IO
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Evento para agregar un nuevo producto
    socket.on('addProduct', async (productData) => {
        try {
            console.log('Agregando producto via WebSocket:', productData);
            const newProduct = await productService.create(productData);
            
            // Emitir a todos los clientes conectados
            io.emit('productAdded', newProduct.toJSON());
            console.log('Producto agregado exitosamente:', newProduct.id);
        } catch (error) {
            console.error('Error al agregar producto:', error);
            socket.emit('error', {
                message: 'Error al agregar producto: ' + error.message
            });
        }
    });

    // Evento para eliminar un producto
    socket.on('deleteProduct', async (productId) => {
        try {
            console.log('Eliminando producto via WebSocket:', productId);
            const deletedProduct = await productService.delete(productId);
            
            // Emitir a todos los clientes conectados
            io.emit('productDeleted', productId);
            console.log('Producto eliminado exitosamente:', productId);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            socket.emit('error', {
                message: 'Error al eliminar producto: ' + error.message
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API Products: http://localhost:${PORT}/api/products`);
    console.log(`API Carts: http://localhost:${PORT}/api/carts`);
    console.log(`Vista Home: http://localhost:${PORT}/`);
    console.log(`Vista Real Time: http://localhost:${PORT}/realtimeproducts`);
});
