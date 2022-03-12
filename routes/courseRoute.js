const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.route("/").post(courseController.createCours);

module.exports = router;
