const pageController = require('../controllers/pageController');
const express = require('express');

const router = express.Router();

router.route('/').get(pageController.getHomePage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(pageController.getRegisterPage);
router.route('/login').get(pageController.getLoginPage);


module.exports = router;
