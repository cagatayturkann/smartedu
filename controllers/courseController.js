const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');

exports.createCourse = async (req, res) => {
	try {
		const course = await Course.create({
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			user: req.session.userId,
		});

		req.flash('success', `${course.name} has been created successfully`);
		res.status(201).redirect('/courses');
	} catch (error) {
		req.flash('error', 'Something happened');
		res.status(400).redirect('/course');
	}
};

exports.getAllCourses = async (req, res) => {
	try {
		const categorySlug = req.query.categories;
		const query = req.query.search;
		const category = await Category.findOne({ slug: categorySlug });
		let filter = {};
		if (categorySlug) {
			filter = { category: category._id };
		}

		if (query) {
			filter = { name: query };
		}

		if (!query && !categorySlug) {
			(filter.name = ''), (filter.category = null);
		}

		const courses = await Course.find({
			$or: [
				{ name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
				{ category: filter.category },
			],
		})
			.sort('-createdAt')
			.populate('user');
		const categories = await Category.find();
		res.status(200).render('courses', {
			courses,
			categories,
			pageName: 'courses',
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			error,
		});
	}
};

exports.getCourse = async (req, res) => {
	try {
		const user = await User.findById(req.session.userId);
		const course = await Course.findOne({ slug: req.params.slug }).populate(
			'user'
		);
		const categories = await Category.find();
		res.status(200).render('singleCourse', {
			course,
			pageName: 'courses',
			user,
			categories,
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			error,
		});
	}
};

exports.enrollCourse = async (req, res) => {
	try {
		const user = await User.findById(req.session.userId);
		await user.courses.push({ _id: req.body.courseId });
		await user.save();
		res.status(200).redirect('/users/dashboard');
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			error,
		});
		console.log(error.message);
	}
};

exports.releaseCourse = async (req, res) => {
	try {
		const user = await User.findById(req.session.userId);
		await user.courses.pull({ _id: req.body.courseId });
		await user.save();
		res.status(200).redirect('/users/dashboard');
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			error,
		});
		console.log(error.message);
	}
};

exports.deleteCourse = async (req, res) => {
	try {
		const course = await Course.findOneAndRemove({ slug: req.params.slug });
		req.flash('error', `${course.name} has been removed successfully`);
		res.status(200).redirect('/users/dashboard');
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			error,
		});
		console.log(error.message);
	}
};

exports.updateCourse = async (req, res) => {
	try {
		const course = await Course.findOne({ slug: req.params.slug });
		course.name = req.body.name;
		course.description = req.body.description;
		course.category = req.body.category;
		course.save();
		// req.flash('error', `${course.name} has been removed successfully`);
		res.status(200).redirect('/users/dashboard');
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			error,
		});
		console.log(error.message);
	}
};
