const User= require('../models/user.model')
const moment= require('moment');

module.exports.view = async function(req, res, next) {
	try {
		var id= req.params.id;
		user= await User.findOne({_id: id});
		res.render('view', {
			create: moment(user.update).format('MMMM Do YYYY, h:mm:ss a')
		});
	} catch(error) {
		next(error);
	}
};