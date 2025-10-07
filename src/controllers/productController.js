const productService = require('../services/productService');

class ProductController {
    // GET /api/products - Listar productos con paginación, filtro y orden
    async getAll(req, res) {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;

            const result = await productService.getPaginated({
                limit: parseInt(limit),
                page: parseInt(page),
                sort,
                query
            });

            const basePath = `${req.protocol}://${req.get('host')}${req.baseUrl}`; // /api/products
            const buildLink = (targetPage) => {
                if (!targetPage) return null;
                const params = new URLSearchParams();
                params.set('page', targetPage);
                params.set('limit', String(limit || 10));
                if (sort) params.set('sort', sort);
                if (query) params.set('query', query);
                return `${basePath}?${params.toString()}`;
            };

            res.json({
                status: 'success',
                payload: result.payload,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: buildLink(result.prevPage),
                nextLink: buildLink(result.nextPage)
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // GET /api/products/:pid - Obtener producto por ID
    async getById(req, res) {
        try {
            const { pid } = req.params;
            const product = await productService.getById(pid);
            res.json({
                status: 'success',
                data: product.toJSON()
            });
        } catch (error) {
            if (error.message === 'Producto no encontrado') {
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

    // POST /api/products - Crear nuevo producto
    async create(req, res) {
        try {
            const productData = req.body;
            const newProduct = await productService.create(productData);
            res.status(201).json({
                status: 'success',
                message: 'Producto creado exitosamente',
                data: newProduct.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // PUT /api/products/:pid - Actualizar producto
    async update(req, res) {
        try {
            const { pid } = req.params;
            const updateData = req.body;
            const updatedProduct = await productService.update(pid, updateData);
            res.json({
                status: 'success',
                message: 'Producto actualizado exitosamente',
                data: updatedProduct.toJSON()
            });
        } catch (error) {
            if (error.message === 'Producto no encontrado') {
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

    // DELETE /api/products/:pid - Eliminar producto
    async delete(req, res) {
        try {
            const { pid } = req.params;
            const deletedProduct = await productService.delete(pid);
            res.json({
                status: 'success',
                message: 'Producto eliminado exitosamente',
                data: deletedProduct.toJSON()
            });
        } catch (error) {
            if (error.message === 'Producto no encontrado') {
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

    // GET /api/products/category/:category - Obtener productos por categoría
    async getByCategory(req, res) {
        try {
            const { category } = req.params;
            const products = await productService.getByCategory(category);
            res.json({
                status: 'success',
                data: products.map(product => product.toJSON()),
                total: products.length,
                category: category
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // GET /api/products/price-range - Obtener productos por rango de precio
    async getByPriceRange(req, res) {
        try {
            const { min, max } = req.query;
            const minPrice = parseFloat(min) || 0;
            const maxPrice = parseFloat(max) || Infinity;
            
            const products = await productService.getByPriceRange(minPrice, maxPrice);
            res.json({
                status: 'success',
                data: products.map(product => product.toJSON()),
                total: products.length,
                priceRange: { min: minPrice, max: maxPrice }
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new ProductController();
