const pageController = require('../controllers/pageController');
const express = require('express');

const router = express.Router();

router.route('/').get(pageController.getHomePage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(pageController.getRegisterPage);

module.exports = router;
