require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const ProductModel = require('../models/ProductModel');
const CartModel = require('../models/CartModel');

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');

    const dataPath = path.join(__dirname, '../../data');
    const productsData = JSON.parse(await fs.readFile(path.join(dataPath, 'products.json'), 'utf8'));
    const cartsData = JSON.parse(await fs.readFile(path.join(dataPath, 'carts.json'), 'utf8'));

    // Insertar productos y mapear IDs antiguos a nuevos
    const idMap = new Map();
    for (const prod of productsData) {
      const newProd = await ProductModel.create(prod);
      idMap.set(prod.id, newProd._id);
    }
    console.log('Productos migrados:', productsData.length);

    // Migrar carritos usando el mapa de IDs
    for (const cart of cartsData) {
      const newCart = await CartModel.create({
        products: cart.products.map(p => ({
          product: idMap.get(p.product.id) || p.product.id, // Fallback si no encuentra
          quantity: p.quantity
        }))
      });
      console.log('Carrito migrado:', newCart._id);
    }

    console.log('Migración completada');
  } catch (error) {
    console.error('Error en migración:', error);
  } finally {
    await mongoose.connection.close();
  }
}

migrate();