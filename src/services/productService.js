const db = require('../db');
const Product = require('../models/Product');

class ProductService {
    async getAll() {
        const productsData = await db.getProducts();
        return productsData.map(product => Product.fromJSON(product));
    }

    async getById(id) {
        const productsData = await db.getProducts();
        const productData = productsData.find(p => p.id === parseInt(id));
        
        if (!productData) {
            throw new Error('Producto no encontrado');
        }
        
        return Product.fromJSON(productData);
    }

    async create(productData) {
        const productsData = await db.getProducts();
        
        // Validar producto
        const product = new Product(productData);
        const errors = product.validate();
        
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        // Verificar que el código no se repita
        const existingProduct = productsData.find(p => p.code === product.code);
        if (existingProduct) {
            throw new Error('Ya existe un producto con ese código');
        }

        // Generar ID único
        const maxId = productsData.length > 0 ? Math.max(...productsData.map(p => p.id)) : 0;
        product.id = maxId + 1;

        // Guardar producto
        productsData.push(product.toJSON());
        await db.saveProducts(productsData);

        return product;
    }

    async update(id, updateData) {
        const productsData = await db.getProducts();
        const productIndex = productsData.findIndex(p => p.id === parseInt(id));
        
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        // No permitir actualizar el ID
        if (updateData.id) {
            delete updateData.id;
        }

        // Actualizar producto
        const updatedProduct = {
            ...productsData[productIndex],
            ...updateData
        };

        // Validar producto actualizado
        const product = new Product(updatedProduct);
        const errors = product.validate();
        
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        // Verificar que el código no se repita (si se está actualizando)
        if (updateData.code) {
            const existingProduct = productsData.find(p => p.code === updateData.code && p.id !== parseInt(id));
            if (existingProduct) {
                throw new Error('Ya existe un producto con ese código');
            }
        }

        // Guardar cambios
        productsData[productIndex] = product.toJSON();
        await db.saveProducts(productsData);

        return product;
    }

    async delete(id) {
        const productsData = await db.getProducts();
        const productIndex = productsData.findIndex(p => p.id === parseInt(id));
        
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        const deletedProduct = productsData.splice(productIndex, 1)[0];
        await db.saveProducts(productsData);

        return Product.fromJSON(deletedProduct);
    }

    async getByCategory(category) {
        const productsData = await db.getProducts();
        return productsData
            .filter(p => p.category.toLowerCase() === category.toLowerCase())
            .map(product => Product.fromJSON(product));
    }

    async getByPriceRange(minPrice, maxPrice) {
        const productsData = await db.getProducts();
        return productsData
            .filter(p => p.price >= minPrice && p.price <= maxPrice)
            .map(product => Product.fromJSON(product));
    }
}

module.exports = new ProductService();
