const Order = require('../model/Order');
const fs = require('fs');
const mongoose = require('mongoose');

module.exports.getAllOrders = async (req, res) => {

  try {
    const response = await Order.find();
    return res.status(200).json(response)
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    })
  }



}

module.exports.addOrder = async (req, res) => {
  const userId = req.userId;

  const { orderItems, totalPrice } = req.body;


  try {
    await Order.create({ user: userId, orderItems, totalPrice });


    return res.status(201).json({
      status: 'Ok',
      message: 'product added'
    })
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    })
  }
}

module.exports.getUserOrder = async (req, res) => {
  const userId = req.userId;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'please provide valid id'
      });
    } else {
      const response = await Order.find({ user: userId });
      return res.status(200).json(response);
    }
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}

module.exports.getOrderDetail = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.isValidObjectId(id)) {
      const response = await Order.findById(id);
      return res.status(200).json(response);

    } else {
      return res.status(400).json({
        status: 'error',
        message: 'provide vaild id'
      });
    }


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    })
  }

}

module.exports.deleteOrderById = async (req, res) => {
  const id = req.id
  try {
    await Order.findOneAndDelete({
      id
    });
  } catch (err) {

  }
}