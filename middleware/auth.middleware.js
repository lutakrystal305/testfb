var User = require('../models/user.model');
var jwt= require('jsonwebtoken')

var user;
module.exports.requireAuth= function(req, res, next) {
	console.log(req.cookies.token);
	console.log(req.session.passport.user.id);
	var token= req.cookies.token;
	if (!token) {
		res.redirect('/auth/login');
		return;
	}
	jwt.verify(token, 'shhhhh', async (err, decoded) => {
	 user= await User.findOne({ _id: decoded.userId});
	})
	if (!user) {
		res.redirect('/auth/login');
		return;
	}
	res.locals.user= user;

	next();
}