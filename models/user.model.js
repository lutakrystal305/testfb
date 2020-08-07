const mongoose = require ('mongoose');


const userSchema = new mongoose.Schema({
	id: String,
	name: String,
	phone: Number,
	email: String,
	password: String,
	avatar: String,
	cover: String,
	date: String,
	address: String,
	uni: String,
	xname: String,
	his: String,
	update: {type: Date, default: Date.now}
})

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;