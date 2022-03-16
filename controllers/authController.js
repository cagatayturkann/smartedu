const bcrypt = require('bcrypt');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).redirect('/login');
	} catch (error) {
		const errors = validationResult(req);
		for (let i = 0; i < errors.array().length; i++) {
			req.flash('error', `${errors.array()[i].msg}`);
		}
		res.status(400).redirect('/register');
	}
};

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		await User.findOne({ email }, (err, user) => {
			if (user) {
				bcrypt.compare(password, user.password, (err, same) => {
					if (same) {
						//USER SESSION
						req.session.userId = user._id;
						res.status(200).redirect('/users/dashboard');
					} else {
						req.flash('error', `Your password is not correct`);
						res.status(400).redirect('/login');
					}
				});
			} else {
				req.flash('error', `User is not exist!`);
				res.status(400).redirect('/login');
			}
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			error,
		});
	}
};

exports.logoutUser = async (req, res) => {
	req.session.destroy(() => {
		//session ending function
		res.redirect('/');
	});
};

exports.getDashboardPage = async (req, res) => {
	const user = await User.findOne({ _id: req.session.userId }).populate(
		'courses'
	);
	const categories = await Category.find();
	const courses = await Course.find({ user: req.session.userId }); //course içindeki user id ile session içindeki user id örtüşenleri bulacak
	res.status(200).render('dashboard', {
		pageName: 'dashboard',
		user,
		categories,
		courses,
	});
};
