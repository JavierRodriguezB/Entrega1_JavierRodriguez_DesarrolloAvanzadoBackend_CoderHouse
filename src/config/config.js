module.exports = {
    port: process.env.PORT || 8080,
    dataPath: {
        products: './data/products.json',
        carts: './data/carts.json'
    },
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
};
