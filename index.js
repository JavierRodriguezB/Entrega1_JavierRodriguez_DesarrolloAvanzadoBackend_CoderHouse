const app = require('./src/app');

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API Products: http://localhost:${PORT}/api/products`);
    console.log(`API Carts: http://localhost:${PORT}/api/carts`);
});
