const User = require('../models/User');

module.exports = (req, res, next) => { //send user to loginpage if user is not logged in
	User.findById(req.session.userId, (err, user) => {
		if (err || !user) return res.redirect('/login');
		next();
	});
};
