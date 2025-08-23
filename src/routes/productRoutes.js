const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// GET /api/products - Listar todos los productos
router.get('/', productController.getAll);

// GET /api/products/category/:category - Obtener productos por categoría
router.get('/category/:category', productController.getByCategory);

// GET /api/products/price-range - Obtener productos por rango de precio
router.get('/price-range', productController.getByPriceRange);

// GET /api/products/:pid - Obtener producto por ID
router.get('/:pid', productController.getById);

// POST /api/products - Crear nuevo producto
router.post('/', productController.create);

// PUT /api/products/:pid - Actualizar producto
router.put('/:pid', productController.update);

// DELETE /api/products/:pid - Eliminar producto
router.delete('/:pid', productController.delete);

module.exports = router;
