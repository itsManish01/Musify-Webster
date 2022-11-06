const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller')
router.get('/' , homeController.home);
router.use("/home", require("./home"));
router.use("/users", require("./users"));
// router.use("/users", require("./users"));

module.exports = router ;