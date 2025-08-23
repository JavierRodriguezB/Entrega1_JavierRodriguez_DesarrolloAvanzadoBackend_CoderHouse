const express = require('express');
const cors = require('cors');
const productsRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'API de Productos y Carritos funcionando correctamente',
        endpoints: {
            products: '/api/products',
            carts: '/api/carts'
        }
    });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: `La ruta ${req.originalUrl} no existe`
    });
});

// Manejo de errores
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
    });
});

module.exports = app;
