const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, min: 3, max: 12, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: {
		type: String,
		required: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	password: { type: String, required: true },
	role: { type: Number, required: true },
	phone: { type: String, min: 10, max: 10 },
	major: { type: String }
});

module.exports = mongoose.model('User', userSchema);
