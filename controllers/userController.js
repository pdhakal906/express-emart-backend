const User = require('../model/User');
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

module.exports.getAllUsers = async (req, res) => {
  try {
    const response = await User.find();
    return res.status(200).json(response);

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}

module.exports.userRegister = async (req, res) => {


  const { email, password, fullname } = req.body;
  const imagePath = req.imagePath
  console.log(email, password, fullname, imagePath)
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({
        status: 409,
        message: "user already exists"
      })
    } else {
      const hashed = await bcrypt.hash(password, 10);

      await User.create({
        email,
        fullname,
        password: hashed,
        profile_image: imagePath
      })
      console.log("created")
      return res.status(201).json({
        status: "success",
        message: "user registered"
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: `${err}`
    })
  }
}


module.exports.userLogin = async (req, res) => {

  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({
        status: 404,
        message: "User doesn't exists"
      })
    } else {
      const isValid = bcrypt.compareSync(password, userExist.password);

      if (isValid) {
        const token = jwt.sign({ id: userExist._id, isAdmin: userExist.isAdmin }, 'jsonwebtoken');
        return res.status(200).json({
          id: userExist._id,
          email,
          token,
          shippingAddress: userExist.shippingAddress,
          fullname: userExist.fullname,
          isAdmin: userExist.isAdmin,
          profile_image: userExist.profile_image
        })
      } else {
        return res.status(401).json({
          status: 401,
          message: "passwords do not match"
        })
      }
    }
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: `${err}`
    })
  }
}

module.exports.userUpdate = async (req, res) => {
  const id = req.userId;

  try {
    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    } else {
      userExists.fullname = req.body.fullname || userExists.fullname;
      userExists.email = req.body.email || userExists.email;
      userExists.shippingAddress = req.body.shippingAddress || userExists.shippingAddress;

      userExists.save();
      return res.status(200).json({
        status: 'success',
        message: 'updated successfully'
      });

    }


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }

}

module.exports.getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const response = await User.findById(userId);
    if (!response) {
      return res.status(404).json({
        status: 'error',
        message: 'user does not exist'
      });
    } else {
      return res.status(200).json(response)
    }

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    })
  }
}