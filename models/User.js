const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { use } = require('../routes/userRoute');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.pre('save', function (next) {
	const user = this;
	bcrypt.hash(user.password, 10, (error, hash) => {
		user.password = hash;
		next();
	});
});

const User = mongoose.model('User', UserSchema);
module.exports = User;