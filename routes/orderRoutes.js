const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const userCheck = require('../middleware/userCheck')
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const orderSchema = Joi.object({
  totalPrice: Joi.number().required(),
  orderItems: Joi.array().min(1).required()
})



router.get('/api/getAllOrders', userCheck.adminCheck, orderController.getAllOrders);
router.get('/api/userOrder', userCheck.userCheck, orderController.getUserOrder);
router.post('/api/addOrder', userCheck.userCheck, validator.body(orderSchema), orderController.addOrder)
router.get('/api/orderDetail/:id', userCheck.userCheck, orderController.getOrderDetail)
module.exports = router;