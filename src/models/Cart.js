class Cart {
    constructor(data = {}) {
        this.id = data.id || null;
        this.products = data.products || [];
    }

    // Agregar producto al carrito
    addProduct(productId, quantity = 1) {
        const existingProduct = this.products.find(p => p.product === productId);
        
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            this.products.push({
                product: productId,
                quantity: quantity
            });
        }
    }

    // Remover producto del carrito
    removeProduct(productId) {
        this.products = this.products.filter(p => p.product !== productId);
    }

    // Actualizar cantidad de producto
    updateProductQuantity(productId, quantity) {
        const product = this.products.find(p => p.product === productId);
        if (product) {
            if (quantity <= 0) {
                this.removeProduct(productId);
            } else {
                product.quantity = quantity;
            }
        }
    }

    // Vaciar carrito
    clear() {
        this.products = [];
    }

    // Obtener cantidad de productos en el carrito
    getProductCount() {
        return this.products.reduce((total, item) => total + item.quantity, 0);
    }

    // Validar carrito
    validate() {
        const errors = [];

        if (!Array.isArray(this.products)) {
            errors.push('Los productos deben ser un array');
        }

        for (const item of this.products) {
            if (!item.product || !item.quantity) {
                errors.push('Cada producto debe tener id y cantidad');
            }
            if (item.quantity <= 0) {
                errors.push('La cantidad debe ser mayor a 0');
            }
        }

        return errors;
    }

    // Convertir a objeto plano
    toJSON() {
        return {
            id: this.id,
            products: this.products
        };
    }

    // Crear instancia desde objeto plano
    static fromJSON(data) {
        return new Cart(data);
    }
}

module.exports = Cart;
