const { default: mongoose } = require('mongoose');
const Product = require('../model/Product');
const fs = require('fs');

module.exports.getAllProducts = async (req, res) => {

  try {
    const response = await Product.find();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    })
  }

}


module.exports.addProduct = async (req, res) => {
  const imagePath = req.imagePath;
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock

  } = req.body;


  try {
    await Product.create({
      product_name,
      product_detail,
      product_price,
      product_image: imagePath,
      brand,
      category,
      countInStock
    })

    return res.status(201).json({
      status: 'success',
      message: 'product added successfully'
    })
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }

}

module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: 'error',
        message: "provide vaild id"
      })
    } else {
      const response = await Product.findById(id);

      return res.status(200).json(response)

    }

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}