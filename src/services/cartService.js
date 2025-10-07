const CartModel = require('../models/CartModel');
const Cart = require('../models/Cart');
const productService = require('./productService');

class CartService {
    async getAll() {
        const cartsData = await CartModel.find({});
        return cartsData.map(cart => Cart.fromJSON(cart.toObject()));
    }

    async getById(id) {
        const cartData = await CartModel.findById(id);
        if (!cartData) {
            throw new Error('Carrito no encontrado');
        }
        return Cart.fromJSON(cartData.toObject());
    }

    async create() {
        const saved = await CartModel.create({ products: [] });
        return Cart.fromJSON(saved.toObject());
    }

    async addProduct(cartId, productId, quantity = 1) {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        await productService.getById(productId); // Verifica producto
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }
        const saved = await cart.save();
        return Cart.fromJSON(saved.toObject());
    }

    async removeProduct(cartId, productId) {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        const saved = await cart.save();
        return Cart.fromJSON(saved.toObject());
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex >= 0) {
            cart.products[productIndex].quantity = quantity;
        } else {
            throw new Error('Producto no encontrado en el carrito');
        }
        const saved = await cart.save();
        return Cart.fromJSON(saved.toObject());
    }

    async clear(cartId) {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        cart.products = [];
        const saved = await cart.save();
        return Cart.fromJSON(saved.toObject());
    }

    async delete(cartId) {
        const deleted = await CartModel.findByIdAndDelete(cartId);
        if (!deleted) {
            throw new Error('Carrito no encontrado');
        }
        return Cart.fromJSON(deleted.toObject());
    }

    async getCartWithProducts(cartId) {
        const cart = await CartModel.findById(cartId).populate('products.product');
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        return cart; // Mongoose populate ya incluye detalles
    }

    async updateProducts(cartId, productsArray) {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        const normalized = [];
        for (const item of productsArray) {
            const productId = item.product || item.productId || item.id;
            const quantity = item.quantity;
            if (!productId || !quantity || quantity <= 0) {
                throw new Error('Cada producto debe incluir un id válido y cantidad > 0');
            }
            await productService.getById(productId);
            normalized.push({ product: productId, quantity });
        }
        cart.products = normalized;
        const saved = await cart.save();
        return Cart.fromJSON(saved.toObject());
    }
}

module.exports = new CartService();
