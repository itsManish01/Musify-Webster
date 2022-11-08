const express = require('express');
const router = express.Router();
const passport =require('passport');

const userController = require('../controllers/user_controller');
router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/sign-up", userController.signUP);
router.get('/sign-in' , userController.signIN );
router.post('/create' , userController.create);
router.get('/create-session' , userController.createSession);
router.get('/sign-out' , userController.destroySession);
router.post('/play' , passport.checkAuthentication, userController.playSong);
//use passport as a middle ware to Authenticate
router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect : 'users/sign-in'},
), userController.createSession ) ;
module.exports= router;