const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json({
			status: 'Success',
			user,
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			error,
		});
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
					}
				});
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
	const user = await User.findOne({ _id: req.session.userId });
	res.status(200).render('dashboard', {
		pageName: 'dashboard',
		user,
	});
};
