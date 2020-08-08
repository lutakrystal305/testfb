var express= require('express');
var router= express.Router();
var multer= require('multer');
const passport = require('passport');
const passportFB= require('passport-facebook').Strategy;
var controller1= require('../controller/auth.controller');
var controller2= require('../controller/create.controller');
var jwt= require('jsonwebtoken')

var upload = multer({ dest: './public/uploads/' });

router.get('/login', controller1.login);
router.post('/login', controller1.postLogin);

router.get('/fb', passport.authenticate('facebook', {scope: ['email']}));
router.get('/fb/cb', passport.authenticate('facebook',
  (req, res, next) => {
	let token= jwt.sign({ userId: user._id}, "shhhhh");
		 res.cookie('token', token, { // store it in an https only cookie
        	signed: true // set to true if your using https
    	});
		res.redirect(/);
});
router.get('')
router.get('/create', controller2.create);
router.post('/create', 
	upload.single('avatar'), 
	controller2.postCreate);
module.exports = router;
