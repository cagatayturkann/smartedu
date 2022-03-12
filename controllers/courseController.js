const Course = require('../models/Course');

exports.createCours = async (req, res) => {
	try {
		const course = await Course.create(req.body);
		res.status(201).json({
			status: 'Success',
			course,
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			error,
		});
	}
};

exports.getAllCourses = async (req, res) => {
	try {
		const courses = await Course.find();
		res.status(200).render('courses', {
			courses,
			pageName: 'courses',
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			error,
		});
	}
};
