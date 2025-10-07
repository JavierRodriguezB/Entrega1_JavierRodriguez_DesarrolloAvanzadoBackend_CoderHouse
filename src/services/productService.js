const ProductModel = require('../models/ProductModel');
const Product = require('../models/Product');

class ProductService {
    async getAll() {
        const productsData = await ProductModel.find({});
        return productsData.map(product => Product.fromJSON(product.toObject()));
    }

    async getById(id) {
        const productData = await ProductModel.findById(id);
        if (!productData) {
            throw new Error('Producto no encontrado');
        }
        return Product.fromJSON(productData.toObject());
    }

    async create(productData) {
        const product = new Product(productData);
        const errors = product.validate();
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }
        const existing = await ProductModel.findOne({ code: product.code });
        if (existing) {
            throw new Error('Ya existe un producto con ese código');
        }
        const saved = await ProductModel.create(product.toJSON());
        return Product.fromJSON(saved.toObject());
    }

    async update(id, updateData) {
        const productData = await ProductModel.findById(id);
        if (!productData) {
            throw new Error('Producto no encontrado');
        }
        if (updateData.id) delete updateData.id;
        Object.assign(productData, updateData);
        const product = new Product(productData.toObject());
        const errors = product.validate();
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }
        if (updateData.code) {
            const existing = await ProductModel.findOne({ code: updateData.code, _id: { $ne: id } });
            if (existing) {
                throw new Error('Ya existe un producto con ese código');
            }
        }
        const saved = await productData.save();
        return Product.fromJSON(saved.toObject());
    }

    async delete(id) {
        const deleted = await ProductModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new Error('Producto no encontrado');
        }
        return Product.fromJSON(deleted.toObject());
    }

    async getByCategory(category) {
        const productsData = await ProductModel.find({ category: new RegExp(category, 'i') });
        return productsData.map(p => Product.fromJSON(p.toObject()));
    }

    async getByPriceRange(minPrice, maxPrice) {
        const productsData = await ProductModel.find({ price: { $gte: minPrice, $lte: maxPrice } });
        return productsData.map(p => Product.fromJSON(p.toObject()));
    }

    async getPaginated(options = {}) {
        const { limit = 10, page = 1, sort, query } = options;
        const filter = {};
        if (query) {
            const q = String(query).toLowerCase();
            if (q === 'available') {
                filter.status = true;
                filter.stock = { $gt: 0 };
            } else if (q === 'unavailable') {
                filter.$or = [{ status: false }, { stock: { $lte: 0 } }];
            } else {
                filter.category = new RegExp(q, 'i');
            }
        }
        const sortObj = {};
        if (sort === 'asc' || sort === 'desc') {
            sortObj.price = sort === 'asc' ? 1 : -1;
        }
        const [totalDocs, pageDocs] = await Promise.all([
            ProductModel.countDocuments(filter),
            ProductModel.find(filter).sort(sortObj).skip((page - 1) * limit).limit(limit)
        ]);
        const totalPages = Math.ceil(totalDocs / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        return {
            payload: pageDocs.map(p => Product.fromJSON(p.toObject())),
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            totalDocs
        };
    }
}

module.exports = new ProductService();
