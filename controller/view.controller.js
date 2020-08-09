const User= require('../models/user.model')
const moment= require('moment');


module.exports.view = async function(req, res, next) {
	try {
		var id= req.params.id;
		let user= await User.findOne({_id: id});
		res.render('view', {
			user,
			create: moment(user.update).format('MMMM Do YYYY, h:mm:ss a')
		});
	} catch(error) {
		next(error);
	}
};
module.exports.updateCover = async function(req, res, next) {
	try {
		var id= req.params.id;
		console.log(req.file.path)
		req.body.cover = req.file.path.split('/').slice(1).join('/');
		let user= await User.findOneAndUpdate({_id:id}, {$set : {
			cover: req.body.cover
		}})
		console.log(user);
		res.redirect(`/user/${id}`)
	} catch(error) {
		next(error);
	}
};
module.exports.updateAvatar = async function(req, res, next) {
	try {
		var id= req.params.id;
		console.log(req.file.path)
		req.body.avatar = req.file.path.split('/').slice(1).join('/');
		let user= await User.findOneAndUpdate({_id:id}, {$set : {
			avatar: req.body.avatar
		}})
		res.redirect(`/user/${id}`)
	} catch(error) {
		next(error);
	}
};
module.exports.updateX1 = async function(req, res, next) {
	try {
		var id= req.params.id;
		let user= await User.findOneAndUpdate({_id:id}, {$set : {
			xname: req.body.xname
		}})
		res.redirect(`/user/${id}`)
	} catch(error) {
		next(error);
	}
};
module.exports.updateX2 = async function(req, res, next) {
	try {
		var id= req.params.id;
		let user= await User.findOneAndUpdate({_id:id}, {$set : {
			his: req.body.his
		}})
		res.redirect(`/user/${id}`)
	} catch(error) {
		next(error);
	}
};

module.exports.updateInit= async function(req, res, next) {
	try {
		var id= req.params.id;
		if ((req.body.address.length <3)||(req.body.address.length>50)) {
			res.render('view', {
				errors: [
				'ĐM ở Mĩ à!'
				],
				values: req.body
			})
			return;
		}
		if ((req.body.uni.length <3)||(req.body.uni.length>50)) {
			res.render('view', {
				errors: [
				'Trường đếu nào đây!'
				],
				values: req.body
			})
			return;
		}
		
		let user= await User.findOneAndUpdate({_id: id}, {$set: {
			date: req.body.date,
			address: req.body.address,
			uni: req.body.uni
		}});
		res.redirect(`/user/${id}`);
	} catch(error) {
		next(error);
	}
}
module.exports.updateProfile= async function(req, res, next) {
	try {
		var id= req.params.id;
		console.log(req.body);
		if ((req.body.naddress.length <3)||(req.body.naddress.length>50)) {
			res.render('view', {
				errors: [
				'ĐM ở Mĩ à!'
				],
				case1: 'd-none',
				case2: 'd-flex',
				values: req.body
			})
			return;
		}
		if ((req.body.nuni.length <3)||(req.body.nuni.length>50)) {
			res.render('view', {
				errors: [
				'Trường đếu nào đây!'
				],
				case1: 'd-none',
				case2: 'd-flex',
				values: req.body
			})
			return;
		}
		if ((req.body.newName.length <3)||(req.body.newName.length>30)) {
			res.render('view', {
				errors: [
				'Name is required 3-30 characters!'
				],
				case1: 'd-none',
				case2: 'd-flex',
				values: req.body
			})
			return;
		}
		for (let i=0; i < 10; i++) {
  			if (req.body.newName.split('')	.indexOf(i.toString()) !== -1) {
    			res.render('view', {
    				errors: [
    				'Name does not contain number!'
    				],
    				case1: 'd-none',
					case2: 'd-flex',
    				values: req.body
    			})
    			return;
   			}
		}
		let user= await User.findOneAndUpdate({_id: id}, {$set: {
			name: req.body.newName,
			date: req.body.ndate,
			address: req.body.naddress,
			uni: req.body.nuni,
			phone: req.body.nphone
		}});
		res.redirect(`/user/${id}`);
	} catch(error) {
		next(error);
	}
}