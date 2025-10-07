const cartService = require('../services/cartService');

class CartController {
    // POST /api/carts - Crear nuevo carrito
    async create(req, res) {
        try {
            const newCart = await cartService.create();
            res.status(201).json({
                status: 'success',
                message: 'Carrito creado exitosamente',
                data: newCart.toJSON()
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // GET /api/carts/:cid - Obtener carrito por ID con productos completos
    async getById(req, res) {
        try {
            const { cid } = req.params;
            const cartWithProducts = await cartService.getCartWithProducts(cid);
            res.json({
                status: 'success',
                data: cartWithProducts
            });
        } catch (error) {
            if (error.message === 'Carrito no encontrado') {
                res.status(404).json({
                    status: 'error',
                    message: error.message
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: error.message
                });
            }
        }
    }

    // POST /api/carts/:cid/product/:pid - Agregar producto al carrito
    async addProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity = 1 } = req.body;
            
            const updatedCart = await cartService.addProduct(cid, pid, parseInt(quantity));
            res.json({
                status: 'success',
                message: 'Producto agregado al carrito exitosamente',
                data: updatedCart.toJSON()
            });
        } catch (error) {
            if (error.message === 'Carrito no encontrado' || error.message === 'Producto no encontrado') {
                res.status(404).json({
                    status: 'error',
                    message: error.message
                });
            } else {
                res.status(400).json({
                    status: 'error',
                    message: error.message
                });
            }
        }
    }

    // PUT /api/carts/:cid/product/:pid - Actualizar cantidad de producto en el carrito
    async updateProductQuantity(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            
            if (quantity === undefined) {
                return res.status(400).json({
                    status: 'error',
                    message: 'La cantidad es requerida'
                });
            }

            const updatedCart = await cartService.updateProductQuantity(cid, pid, parseInt(quantity));
            res.json({
                status: 'success',
                message: 'Cantidad actualizada exitosamente',
                data: updatedCart.toJSON()
            });
        } catch (error) {
            if (error.message === 'Carrito no encontrado' || error.message === 'Producto no encontrado en el carrito') {
                res.status(404).json({
                    status: 'error',
                    message: error.message
                });
            } else {
                res.status(400).json({
                    status: 'error',
                    message: error.message
                });
            }
        }
    }

    // DELETE /api/carts/:cid/product/:pid - Eliminar producto del carrito
    async removeProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await cartService.removeProduct(cid, pid);
            res.json({
                status: 'success',
                message: 'Producto eliminado del carrito exitosamente',
                data: updatedCart.toJSON()
            });
        } catch (error) {
            if (error.message === 'Carrito no encontrado' || error.message === 'Producto no encontrado en el carrito') {
                res.status(404).json({
                    status: 'error',
                    message: error.message
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: error.message
                });
            }
        }
    }

    // DELETE /api/carts/:cid - Vaciar carrito
    async clear(req, res) {
        try {
            const { cid } = req.params;
            const clearedCart = await cartService.clear(cid);
            res.json({
                status: 'success',
                message: 'Carrito vaciado exitosamente',
                data: clearedCart.toJSON()
            });
        } catch (error) {
            if (error.message === 'Carrito no encontrado') {
                res.status(404).json({
                    status: 'error',
                    message: error.message
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: error.message
                });
            }
        }
    }

    // PUT /api/carts/:cid - Actualizar todos los productos del carrito
    async updateAllProducts(req, res) {
        try {
            const { cid } = req.params;
            const { products } = req.body;

            if (!Array.isArray(products)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Se requiere un arreglo de productos'
                });
            }

            const updatedCart = await cartService.updateProducts(cid, products);
            res.json({
                status: 'success',
                message: 'Carrito actualizado exitosamente',
                data: updatedCart.toJSON()
            });
        } catch (error) {
            if (error.message === 'Carrito no encontrado' || error.message === 'Producto no encontrado') {
                res.status(404).json({
                    status: 'error',
                    message: error.message
                });
            } else {
                res.status(400).json({
                    status: 'error',
                    message: error.message
                });
            }
        }
    }

    // DELETE /api/carts/:cid - Eliminar carrito completamente
    async delete(req, res) {
        try {
            const { cid } = req.params;
            const deletedCart = await cartService.delete(cid);
            res.json({
                status: 'success',
                message: 'Carrito eliminado exitosamente',
                data: deletedCart.toJSON()
            });
        } catch (error) {
            if (error.message === 'Carrito no encontrado') {
                res.status(404).json({
                    status: 'error',
                    message: error.message
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: error.message
                });
            }
        }
    }

    // GET /api/carts - Listar todos los carritos
    async getAll(req, res) {
        try {
            const carts = await cartService.getAll();
            res.json({
                status: 'success',
                data: carts.map(cart => cart.toJSON()),
                total: carts.length
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new CartController();
