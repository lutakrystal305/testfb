var md5 = require('md5');

var User= require('../models/user.model');

var jwt= require('jsonwebtoken');

var user;
module.exports.login= function (req, res, next) {
	try {
		var token= req.cookies.token;
		if (token) {
			res.redirect('/');
		}
	 	else {

		res.render('login');
}
} catch (error) {
		next(error);
	}
} 
module.exports.postLogin= async function(req, res, next) {
	try {	
		var email = req.body.email;
		var password = req.body.password;

		var user = await User.findOne({ email: email });
		if (!user) {
			res.render('login', {
				errors: [
				'User does not exist!'
				], 	
				values: req.body
			});
			return;
		}
		var hashedPassword= md5(password);
		if (user.password !== hashedPassword) {
			res.render('login', {
				errors: [
				'Password is wrong, you can try again!'
				],
				values: req.body 
			});
			return;
		}
		let token= jwt.sign({ userId: user._id}, "shhhhh");
		 res.cookie('token', token, { // store it in an https only cookie
        	secure: false, // set to true if your using https
        	httpOnly: true
    	});
		res.redirect('/');
	} catch (error) {
		next(error);
	}
};