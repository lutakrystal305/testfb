const User= require('../models/user.model')
var nodemailer = require('nodemailer');
var transporter =  nodemailer.createTransport({ // config mail server
        service: 'gmail',
        auth: {
            user: 'lutakrystal305@gmail.com',
            pass: `${process.env.PASSWORD1}`
        }
    });
module.exports.indexQuote= function(req, res, next) {
	let name= req.body.name;
	let gmail= req.body.email;
	var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
	        from: 'Luta Krystal',
	        to: req.body.email,
	        subject: 'Welcome to Amber!',
	        text: 'You recieved Message from Amber',
	        html: `<h1>Hi, ${name} </h1><p>Bạn cần giúp gì không?</p>` 
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