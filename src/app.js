const express = require('express');
const cors = require('cors');
const { engine } = require('express-handlebars');
const path = require('path');
const productsRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const viewsRouter = require('./routes/views.router');

const app = express();

// Configurar Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRouter);

// Ruta de información de la API
app.get('/api', (req, res) => {
    res.json({
        message: 'API de Productos y Carritos funcionando correctamente',
        endpoints: {
            products: '/api/products',
            carts: '/api/carts',
            home: '/',
            realTimeProducts: '/realtimeproducts'
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
