var md5= require('md5');

var User = require('../models/user.model');

var nodemailer = require('nodemailer');
var transporter =  nodemailer.createTransport({ // config mail server
        service: 'gmail',
        auth: {
            user: 'lutakrystal305@gmail.com',
            pass: `${process.env.PASSWORD1}`
        }
    });
module.exports.create= (req, res) => {
	res.render('create');
};
module.exports.postCreate=async (req, res, next) => {
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	//validate
	try {
		const checkUser= await User.findOne({email: req.body.email});
		if (checkUser) {
			res.render('create', {
				errors: [
				'Email existed!'
				],
				values: req.body
			})
			return;
		}
		if (req.body.email.indexOf('@gmail.com') === -1) {
			res.render('create', {
				errors: [
				'Gmail is required!'
				],
				values: req.body
			})
			return;
		}
		if ((req.body.name.length < 3)|| (req.body.name.length >30)) {
			res.render('create', {
				errors: [
				'Name is required 3-30 characters!'
				],
				values: req.body
			})
			return;
		}
		for (let i=0; i < 10; i++) {
  			if (req.body.name.split('')	.indexOf(i.toString()) !== -1) {
    			res.render('create', {
    				errors: [
    				'Name does not contain number!'
    				],
    				values: req.body
    			})
    			return;
   			}
		}
		if ((req.body.email.length < 6)|| (req.body.email.length >50)) {
			res.render('create', {
				errors: [
				'Email is required 6-50 characters!'
				],
				values: req.body
			})
			return;
		}
		if (req.body.email.indexOf(' ') !== -1) {
			res.render('create', {
				errors: [
				'Email does not contain space!'
				], 
				values:req.body
			})
			return;
		}
		if ((req.body.password.length < 6)|| (req.body.password.length >50)) {
			res.render('create', {
				errors: [
				'Password is required 6-50 characters!'
				],
				values: req.body
			})
			return;
		}
		else {
		var passwordX= req.body.password;
		req.body.password = md5(req.body.password);

			var user=await new User(req.body);
			user.save();
		
		var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Luta Krystal',
        to: req.body.email,
        subject: 'Welcome to Amber!',
        text: 'You recieved Message from Amber',
        html: '<h1>Hi new member</h1><ul><li>Username:' + req.body.name + '</li><li>Email:' + req.body.email + '</li><li>Password:' + passwordX + '</li></ul>'
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' +  info.response);
        }
    });
		res.redirect('/');
		}
	} catch (error) {
		next(error);
	}
}