require('dotenv').config();
const express = require('express');
const app= express();
var jwt= require('jsonwebtoken');

var mongoose= require('mongoose');
const passport = require('passport');
const passportFB= require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');
const session= require('express-session');


const User= require('./models/user.model');
const pass= process.env.PASSWORD2;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(`mongodb+srv://vanthai:${pass}@cluster0.rh1oc.mongodb.net/Management`)

const bodyParser= require('body-parser');

const authRoute= require('./route/auth.route');
const userRoute= require('./route/user.route');

const authMiddleware= require('./middleware/auth.middleware');

const quoteController= require('./controller/index.controller');


passport.serializeUser((user, done) => {
	done(null, user)
});
passport.deserializeUser( async (id, done) => {
	await User.findOne({id}, (err, user) => {
		done(null, user);
	})
})
passport.use(new passportFB({
	clientID: '321273062334733',
	clientSecret: '389cb897ebe0505ea20dc36510fa0b05',
	callbackURL: 'https://amber-social.herokuapp.com/auth/fb/cb',
	profileFields: ['email', 'gender', 'locale', 'displayName']
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



app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const port= process.env.PORT || 3000;

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
app.post('/', quoteController.indexQuote);
app.get('/creator', authMiddleware.requireAuth, (req, res) => {
	res.render('me');
})
app.use('/auth', authRoute);
app.use('/user', authMiddleware.requireAuth, userRoute);




app.listen(port, () => {
	console.log('example start on port '+ port);
})

