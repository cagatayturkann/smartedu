const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');

const app = express();

//Connect DB
mongoose
	.connect(`mongodb://localhost:27017/smartedu-db`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useFindAndModify: false,
	})
	.then(() => {
		console.log('DB CONNECTED!!');
	})
	.catch((err) => {
		console.log(err);
	});

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
});
