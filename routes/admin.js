const express = require('express');
const router = express.Router();
const passport =require('passport');

const adminController = require('../controllers/admin_controller');
router.get("/", adminController.home);
router.post("/add-song", adminController.addSong);

module.exports =router;