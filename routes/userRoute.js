const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

router.route('/signup').post(
	[
		body('name').not().isEmpty().withMessage('Please Enter Your Name'),
		body('email')
			.not()
			.isEmail()
			.withMessage('Please Enter a Valid Email')
			.custom((userEmail) => {
				return User.findOne({ email: userEmail }).then((user) => {
					if (user) {
						return Promise.reject('Email is already exist!');
					}
				});
			}),
		body('password').not().isEmpty().withMessage('Please Enter Your Password'),
	],

	authController.createUser
); //route('/') refers to http://localhost:3000/users/signup
router.route('/login').post(authController.loginUser); //route('/') refers to http://localhost:3000/users/login
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); // http://localhost:3000/users/dashboard

module.exports = router;
