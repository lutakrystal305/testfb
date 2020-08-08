var express= require('express');
var router= express.Router();
var multer= require('multer');
const passport = require('passport');
const passportFB= require('passport-facebook').Strategy;
var controller1= require('../controller/auth.controller');
var controller2= require('../controller/create.controller');

var upload = multer({ dest: './public/uploads/' });

router.get('/login', controller1.login);
router.post('/login', controller1.postLogin);

router.get('/fb', passport.authenticate('facebook', {scope: ['email']}));
router.get('/fb/cb', passport.authenticate('facebook', {
	failureRedirect: '/auth/login',
	successRedirect: '/'
})
);
router.get('/create', controller2.create);
router.post('/create', 
	upload.single('avatar'), 
	controller2.postCreate);
module.exports = router;
