require('dotenv').config();

const app = require('./src/app');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { connectMongo } = require('./src/db/mongo');

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
            console.log('=== EVENTO addProduct RECIBIDO ===');
            console.log('Datos del producto:', JSON.stringify(productData, null, 2));
            console.log('Cliente ID:', socket.id);
            
            const newProduct = await productService.create(productData);
            console.log('Producto creado en la base de datos:', newProduct.toJSON());
            
            // Emitir a todos los clientes conectados
            const productToEmit = newProduct.toJSON();
            console.log('Emitiendo productAdded a todos los clientes:', productToEmit);
            io.emit('productAdded', productToEmit);
            
            console.log('Producto agregado exitosamente. ID:', newProduct.id);
            console.log('=== FIN EVENTO addProduct ===');
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
            console.log('=== EVENTO deleteProduct RECIBIDO ===');
            console.log('ID del producto a eliminar:', productId);
            console.log('Cliente ID:', socket.id);
            
            const deletedProduct = await productService.delete(productId);
            console.log('Producto eliminado de la base de datos:', deletedProduct.toJSON());
            
            // Emitir a todos los clientes conectados
            console.log('Emitiendo productDeleted a todos los clientes:', productId);
            io.emit('productDeleted', productId);
            
            console.log('Producto eliminado exitosamente. ID:', productId);
            console.log('=== FIN EVENTO deleteProduct ===');
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

connectMongo()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`API Products: http://localhost:${PORT}/api/products`);
      console.log(`API Carts: http://localhost:${PORT}/api/carts`);
      console.log(`Vista Home: http://localhost:${PORT}/`);
      console.log(`Vista Real Time: http://localhost:${PORT}/realtimeproducts`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
