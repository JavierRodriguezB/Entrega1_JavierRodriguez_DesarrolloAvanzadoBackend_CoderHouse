const productService = require('../services/productService');

class ViewController {
    // GET / - Vista home con todos los productos
    async home(req, res) {
        try {
            const products = await productService.getAll();
            res.render('home', {
                title: 'Home',
                products: products.map(product => product.toJSON()),
                scripts: '<script src="/js/home.js"></script>'
            });
        } catch (error) {
            console.error('Error al cargar productos:', error);
            res.render('home', {
                title: 'Home',
                products: [],
                scripts: '<script src="/js/home.js"></script>'
            });
        }
    }

    // GET /realtimeproducts - Vista de productos en tiempo real
    async realTimeProducts(req, res) {
        try {
            const products = await productService.getAll();
            res.render('realTimeProducts', {
                title: 'Productos en Tiempo Real',
                products: products.map(product => product.toJSON()),
                scripts: '<script src="/js/realTimeProducts.js"></script>'
            });
        } catch (error) {
            console.error('Error al cargar productos:', error);
            res.render('realTimeProducts', {
                title: 'Productos en Tiempo Real',
                products: [],
                scripts: '<script src="/js/realTimeProducts.js"></script>'
            });
        }
    }

    // GET /products - Vista con paginación
    async productsIndex(req, res) {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;
            const result = await productService.getPaginated({ limit, page, sort, query });

            res.render('index', {
                title: 'Productos',
                products: result.payload,
                pagination: {
                    totalPages: result.totalPages,
                    prevPage: result.prevPage,
                    nextPage: result.nextPage,
                    page: result.page,
                    hasPrevPage: result.hasPrevPage,
                    hasNextPage: result.hasNextPage
                },
                sort,
                query,
                limit,
                scripts: '<script src="/js/home.js"></script>'
            });
        } catch (error) {
            console.error('Error al cargar productos paginados:', error);
            res.render('index', {
                title: 'Productos',
                products: [],
                pagination: {
                    totalPages: 1,
                    prevPage: null,
                    nextPage: null,
                    page: 1,
                    hasPrevPage: false,
                    hasNextPage: false
                },
                scripts: '<script src="/js/home.js"></script>'
            });
        }
    }

    // GET /products/:pid - Vista detalle de producto
    async productDetail(req, res) {
        try {
            const { pid } = req.params;
            const product = await productService.getById(pid);
            res.render('productDetail', {
                title: product.title,
                product: product.toJSON(),
                scripts: '<script src="/js/home.js"></script>'
            });
        } catch (error) {
            console.error('Error al cargar producto:', error);
            res.status(404).render('productDetail', {
                title: 'Producto no encontrado',
                product: null,
                error: 'Producto no encontrado'
            });
        }
    }

    // GET /carts/:cid - Vista carrito específico
    async cartView(req, res) {
        try {
            const { cid } = req.params;
            const cartService = require('../services/cartService');
            const cart = await cartService.getCartWithProducts(cid);
            res.render('cart', {
                title: `Carrito #${cid}`,
                cart
            });
        } catch (error) {
            console.error('Error al cargar carrito:', error);
            res.status(404).render('cart', {
                title: 'Carrito no encontrado',
                cart: { id: req.params.cid, products: [] },
                error: 'Carrito no encontrado'
            });
        }
    }
}

module.exports = new ViewController();
