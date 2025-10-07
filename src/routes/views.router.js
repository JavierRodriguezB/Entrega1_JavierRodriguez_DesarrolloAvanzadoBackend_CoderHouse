const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

// Ruta para la vista home
router.get('/', viewController.home);

// Ruta para la vista de productos en tiempo real
router.get('/realtimeproducts', viewController.realTimeProducts);

// Nueva vista de productos con paginación
router.get('/products', viewController.productsIndex);

// Vista de detalle de producto
router.get('/products/:pid', viewController.productDetail);

// Vista de carrito específico
router.get('/carts/:cid', viewController.cartView);

module.exports = router;
