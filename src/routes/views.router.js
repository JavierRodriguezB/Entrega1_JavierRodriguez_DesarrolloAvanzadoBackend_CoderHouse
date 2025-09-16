const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

// Ruta para la vista home
router.get('/', viewController.home);

// Ruta para la vista de productos en tiempo real
router.get('/realtimeproducts', viewController.realTimeProducts);

module.exports = router;
