const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

// GET /api/carts - Listar todos los carritos
router.get('/', cartController.getAll);

// POST /api/carts - Crear nuevo carrito
router.post('/', cartController.create);

// GET /api/carts/:cid - Obtener carrito por ID con productos completos
router.get('/:cid', cartController.getById);

// POST /api/carts/:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', cartController.addProduct);
// Alias plural según requerimiento
router.post('/:cid/products/:pid', cartController.addProduct);

// PUT /api/carts/:cid/product/:pid - Actualizar cantidad de producto en el carrito
router.put('/:cid/product/:pid', cartController.updateProductQuantity);
// Alias plural según requerimiento
router.put('/:cid/products/:pid', cartController.updateProductQuantity);

// DELETE /api/carts/:cid/product/:pid - Eliminar producto del carrito
router.delete('/:cid/product/:pid', cartController.removeProduct);
// Alias plural según requerimiento
router.delete('/:cid/products/:pid', cartController.removeProduct);

// DELETE /api/carts/:cid - Vaciar carrito
router.delete('/:cid', cartController.clear);

// PUT /api/carts/:cid - Actualizar todos los productos del carrito
router.put('/:cid', cartController.updateAllProducts);

module.exports = router;
