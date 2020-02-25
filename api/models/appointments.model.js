const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, required: true },
  phone: { type: String, min: 10, max: 10, required: true },
  email: {
		type: String,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
  address: { type: String },
  dateTime: { type: Date, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);