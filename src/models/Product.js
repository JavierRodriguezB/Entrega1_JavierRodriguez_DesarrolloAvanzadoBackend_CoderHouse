class Product {
    constructor(data = {}) {
        this.id = data.id || null;
        this.title = data.title || '';
        this.description = data.description || '';
        this.code = data.code || '';
        this.price = data.price || 0;
        this.status = data.status !== undefined ? data.status : true;
        this.stock = data.stock || 0;
        this.category = data.category || '';
        this.thumbnails = data.thumbnails || [];
    }

    // Validar que el producto tenga todos los campos requeridos
    validate() {
        const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
        const errors = [];

        for (const field of requiredFields) {
            if (!this[field]) {
                errors.push(`El campo ${field} es requerido`);
            }
        }

        if (this.price < 0) {
            errors.push('El precio debe ser un número positivo');
        }

        if (this.stock < 0) {
            errors.push('El stock debe ser un número positivo');
        }

        return errors;
    }

    // Convertir a objeto plano
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            code: this.code,
            price: this.price,
            status: this.status,
            stock: this.stock,
            category: this.category,
            thumbnails: this.thumbnails
        };
    }

    // Crear instancia desde objeto plano
    static fromJSON(data) {
        return new Product(data);
    }
}

module.exports = Product;
