const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
require('dotenv').config()

const app = express();

//Connect DB
mongoose
	.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@smartedu.vg28h.mongodb.net/smartedu-db?retryWrites=true&w=majority`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('DB CONNECTED!!');
	})
	.catch((err) => {
		console.log(err);
	});

//Template Engine
app.set('view engine', 'ejs');

//Global Variable
global.userIn = null;

//Middlewares

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	session({
		secret: 'my_keyboard_cat',
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@smartedu.vg28h.mongodb.net/smartedu-db?retryWrites=true&w=majority`,
		}),
	})
);
app.use(flash());
app.use((req, res, next) => {
	res.locals.flashMessages = req.flash();
	next();
});
app.use(
	methodOverride('_method', {
		methods: ['POST', 'GET'],
	})
);

//Routes
app.use('*', (req, res, next) => {
	userIn = req.session.userId;
	next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
});
