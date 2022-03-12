const Course = require('../models/Course');

exports.createCours = async (req, res) => {
	const course = await Course.create(req.body);
	try {
		res.status(201).json({
      status: 'Success',
      course
    })
	} catch (error) {
		res.status(400).json({
      status: 'Failed',
      error
    })
	}
};
