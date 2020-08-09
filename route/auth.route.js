const express= require('express');
const router= express.Router();
const multer= require('multer');
const jwt= require('jsonwebtoken');
const passport = require('passport');
const passportFB= require('passport-facebook').Strategy;
const controller1= require('../controller/auth.controller');
const controller2= require('../controller/create.controller');


var upload = multer({ dest: './public/uploads/' });

router.get('/login', controller1.login);
router.post('/login', controller1.postLogin);

router.get('/fb', passport.authenticate('facebook', {scope: ['email']}));
router.get('/fb/cb', passport.authenticate('facebook',  {
	failureRedirect: '/auth/login'
}), function(req, res, next) {
		res.redirect('/');
	}
)
router.get('')
router.get('/create', controller2.create);
router.post('/create', 
	upload.single('avatar'), 
	controller2.postCreate);
module.exports = router;
