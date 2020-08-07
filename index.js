const express = require('express');
const app= express();

var mongoose= require('mongoose');
const passport = require('passport');
const passportFB= require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');
const session= require('express-session');

const User= require('./models/user.model');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/passport");

var bodyParser= require('body-parser');

var authRoute= require('./route/auth.route');
var userRoute= require('./route/user.route');

var authMiddleware= require('./middleware/auth.middleware');



app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(session({
	secret: "zzh2hh"
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/', authMiddleware.requireAuth, (req, res) => {
	res.render('index');
})
app.get('/creator', authMiddleware.requireAuth, (req, res) => {
	res.render('me');
})
app.use('/auth', authRoute);
app.use('/', authMiddleware.requireAuth, userRoute);




app.listen(3000, () => {
	console.log('example start on port 3000');
})

passport.use(new passportFB({
	clientID: '321273062334733',
	clientSecret: '389cb897ebe0505ea20dc36510fa0b05',
	callbackURL: 'http://localhost:3000/auth/fb/cb'
},
(accessToken, refreshToken, profile, done) => {
	console.log(profile);
	User.findOne({id: profile._json.id}, (err, user) => {
		if (err) return done(err);
		if (user) return done(null, user)

		const newUser= new User({
			id: profile._json.id,
			name: profile._json.name,
			email: profile._json.email
		})
		newUser.save();
	})
}
));
passport.serializeUser((user, done) => {
	done(null, user.id)
});
passport.deserializeUser( async (id, done) => {
	await User.findOne({id}, (err, user) => {
		done(null, user);
	})
})