const User = require('../models/users.model');
const Appointment = require('../models/appointments.model');

exports.getAll = (req, res, next) => {
	Appointment.find()
		.populate('doctor')
		.then(docs => {
			res.status(200).json({
				count: docs.length,
				appointments: docs
			});
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
};

exports.createAppointment = (req, res, next) => {
	User.findById(req.body.doctor)
		.then(doctor => {
			if (!doctor) {
				return res.status(404).json({
					message: 'Doctor not found'
				});
			}
			const appointment = new Appointment({
				doctor: req.body.doctor,
				patientName: req.body.patientName,
				phone: req.body.phone,
				email: req.body.email,
				address: req.body.address,
				dateTime: req.body.dateTime
			});
			return appointment.save();
		})
		.then(result => {
			res.status(201).json({
				message: 'Appointment added',
				createdAppointment: {
					_id: result._id,
					doctor: result.doctor,
					patientName: result.patientName,
					phone: result.phone,
					email: result.email,
					address: result.address,
					dateTime: result.dateTime
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.getAppointment = (req, res, next) => {
	Appointment.findById(req.params.appId)
		.populate('doctor')
		.then(appointment => {
			if (!appointment) {
				return res.status(404).json({
					message: 'Appointment not found'
				});
			}
			res.status(200).json({
				appointment: appointment
			});
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
};

exports.updateAppointment = (req, res, next) => {
	const id = req.params.appId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Appointment.updateOne({ _id: id }, { $set: updateOps })
		.then(result => {
			res.status(200).json({
				message: 'Appointment updated successfully'
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.deleteAppointment = (req, res, next) => {
	Appointment.deleteOne({ _id: req.params.appId })
		.then(result => {
			res.status(200).json({
				message: 'Appointment deleted'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};