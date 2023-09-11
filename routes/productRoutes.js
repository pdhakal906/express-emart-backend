const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const fileCheck = require('../middleware/fileCheck');
const userCheck = require('../middleware/userCheck');

router.get('/', productController.getAllProducts);
router.post('/api/add/product', userCheck.adminCheck, fileCheck.fileCheck, productController.addProduct)
router.get('/api/product/:id', productController.getProductById);

module.exports = router;
