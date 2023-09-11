const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Joi = require('joi');
const fileCheck = require('../middleware/fileCheck');
const userCheck = require('../middleware/userCheck');
const validator = require('express-joi-validation').createValidator({});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(20)
})

router.get('/api/allUsers', userController.getAllUsers);
router.get('/api/userProfile', userCheck.userCheck, userController.getUserProfile)
router.post('/api/userSignUp', fileCheck.fileCheck, userController.userRegister);
router.post('/api/userLogin', validator.body(loginSchema), userController.userLogin);
router.patch('/api/userUpdate', userCheck.userCheck, userController.userUpdate);

module.exports = router;
