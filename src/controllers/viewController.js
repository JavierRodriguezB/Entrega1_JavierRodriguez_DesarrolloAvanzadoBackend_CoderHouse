const productService = require('../services/productService');

class ViewController {
    // GET / - Vista home con todos los productos
    async home(req, res) {
        try {
            const products = await productService.getAll();
            res.render('home', {
                title: 'Home',
                products: products.map(product => product.toJSON())
            });
        } catch (error) {
            console.error('Error al cargar productos:', error);
            res.render('home', {
                title: 'Home',
                products: []
            });
        }
    }

    // GET /realtimeproducts - Vista de productos en tiempo real
    async realTimeProducts(req, res) {
        try {
            const products = await productService.getAll();
            res.render('realTimeProducts', {
                title: 'Productos en Tiempo Real',
                products: products.map(product => product.toJSON())
            });
        } catch (error) {
            console.error('Error al cargar productos:', error);
            res.render('realTimeProducts', {
                title: 'Productos en Tiempo Real',
                products: []
            });
        }
    }
}

module.exports = new ViewController();
