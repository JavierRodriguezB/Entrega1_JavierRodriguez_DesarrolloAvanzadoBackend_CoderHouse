const fs = require('fs').promises;
const path = require('path');
const config = require('../config/config');

class Database {
    constructor() {
        this.dataPath = path.join(__dirname, '../../data');
        this.productsPath = path.join(this.dataPath, 'products.json');
        this.cartsPath = path.join(this.dataPath, 'carts.json');
        this.initialize();
    }

    async initialize() {
        try {
            // Crear directorio data si no existe
            await fs.mkdir(this.dataPath, { recursive: true });

            // Crear archivos JSON si no existen
            await this.ensureFile(this.productsPath, []);
            await this.ensureFile(this.cartsPath, []);

            console.log('✅ Base de datos inicializada correctamente');
        } catch (error) {
            console.error('❌ Error inicializando base de datos:', error);
        }
    }

    async ensureFile(filePath, defaultData) {
        try {
            await fs.access(filePath);
        } catch {
            await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
        }
    }

    async readFile(filePath) {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error leyendo archivo ${filePath}:`, error);
            return [];
        }
    }

    async writeFile(filePath, data) {
        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error(`Error escribiendo archivo ${filePath}:`, error);
            throw error;
        }
    }

    // Métodos específicos para productos
    async getProducts() {
        return await this.readFile(this.productsPath);
    }

    async saveProducts(products) {
        await this.writeFile(this.productsPath, products);
    }

    // Métodos específicos para carritos
    async getCarts() {
        return await this.readFile(this.cartsPath);
    }

    async saveCarts(carts) {
        await this.writeFile(this.cartsPath, carts);
    }
}

module.exports = new Database();
