module.exports = (req, res, next) => { //send logged in user to main if user tries to open login or register page
	if (req.session.userId) {
		return res.redirect('/');
	}
	next();
};
