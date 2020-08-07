const mongoose = require ('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/passport");


const userSchema = new mongoose.Schema({
	id: String,
	name: String,
	phone: Number,
	email: String,
	password: String,
	avt: String
})

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;