const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.route('/').post(categoryController.createCategory); //route('/') refers to http://localhost:3000/categories 


module.exports = router;
