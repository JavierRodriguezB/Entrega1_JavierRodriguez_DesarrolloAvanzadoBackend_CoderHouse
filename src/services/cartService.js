const db = require('../db');
const Cart = require('../models/Cart');
const productService = require('./productService');

class CartService {
    async getAll() {
        const cartsData = await db.getCarts();
        return cartsData.map(cart => Cart.fromJSON(cart));
    }

    async getById(id) {
        const cartsData = await db.getCarts();
        const cartData = cartsData.find(c => c.id === parseInt(id));
        
        if (!cartData) {
            throw new Error('Carrito no encontrado');
        }
        
        return Cart.fromJSON(cartData);
    }

    async create() {
        const cartsData = await db.getCarts();
        
        // Generar ID único
        const maxId = cartsData.length > 0 ? Math.max(...cartsData.map(c => c.id)) : 0;
        const cart = new Cart({ id: maxId + 1 });

        // Guardar carrito
        cartsData.push(cart.toJSON());
        await db.saveCarts(cartsData);

        return cart;
    }

    async addProduct(cartId, productId, quantity = 1) {
        const cartsData = await db.getCarts();
        const cartIndex = cartsData.findIndex(c => c.id === parseInt(cartId));
        
        if (cartIndex === -1) {
            throw new Error('Carrito no encontrado');
        }

        // Verificar que el producto existe
        try {
            await productService.getById(productId);
        } catch (error) {
            throw new Error('Producto no encontrado');
        }

        // Actualizar carrito
        const cart = Cart.fromJSON(cartsData[cartIndex]);
        cart.addProduct(parseInt(productId), quantity);

        // Guardar cambios
        cartsData[cartIndex] = cart.toJSON();
        await db.saveCarts(cartsData);

        return cart;
    }

    async removeProduct(cartId, productId) {
        const cartsData = await db.getCarts();
        const cartIndex = cartsData.findIndex(c => c.id === parseInt(cartId));
        
        if (cartIndex === -1) {
            throw new Error('Carrito no encontrado');
        }

        const cart = Cart.fromJSON(cartsData[cartIndex]);
        cart.removeProduct(parseInt(productId));

        // Guardar cambios
        cartsData[cartIndex] = cart.toJSON();
        await db.saveCarts(cartsData);

        return cart;
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cartsData = await db.getCarts();
        const cartIndex = cartsData.findIndex(c => c.id === parseInt(cartId));
        
        if (cartIndex === -1) {
            throw new Error('Carrito no encontrado');
        }

        const cart = Cart.fromJSON(cartsData[cartIndex]);
        cart.updateProductQuantity(parseInt(productId), quantity);

        // Guardar cambios
        cartsData[cartIndex] = cart.toJSON();
        await db.saveCarts(cartsData);

        return cart;
    }

    async clear(cartId) {
        const cartsData = await db.getCarts();
        const cartIndex = cartsData.findIndex(c => c.id === parseInt(cartId));
        
        if (cartIndex === -1) {
            throw new Error('Carrito no encontrado');
        }

        const cart = Cart.fromJSON(cartsData[cartIndex]);
        cart.clear();

        // Guardar cambios
        cartsData[cartIndex] = cart.toJSON();
        await db.saveCarts(cartsData);

        return cart;
    }

    async delete(cartId) {
        const cartsData = await db.getCarts();
        const cartIndex = cartsData.findIndex(c => c.id === parseInt(cartId));
        
        if (cartIndex === -1) {
            throw new Error('Carrito no encontrado');
        }

        const deletedCart = cartsData.splice(cartIndex, 1)[0];
        await db.saveCarts(cartsData);

        return Cart.fromJSON(deletedCart);
    }

    async getCartWithProducts(cartId) {
        const cart = await this.getById(cartId);
        const productsWithDetails = [];

        for (const cartProduct of cart.products) {
            try {
                const product = await productService.getById(cartProduct.product);
                productsWithDetails.push({
                    ...cartProduct,
                    productDetails: product.toJSON()
                });
            } catch (error) {
                productsWithDetails.push({
                    ...cartProduct,
                    productDetails: {
                        error: 'Producto no encontrado',
                        id: cartProduct.product
                    }
                });
            }
        }

        return {
            id: cart.id,
            products: productsWithDetails
        };
    }
}

module.exports = new CartService();
