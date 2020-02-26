const User = require('../models/users.model');

// Add role
/*
	const role = new Role({
		roleId: 2,
		name: 'doctor'
	});
	role.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Role addedd successfully'
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
*/

exports.getAll = (req, res, next) => {
	User.find()
		.select('_id username firstName lastName email phone major')
		.then(docs => {
			const response = {
				count: docs.length,
				doctors: docs
			};
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.createDoctor = (req, res, next) => {
	console.log(req.file);
	const user = new User({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		role: 2,
		phone: req.body.phone,
		major: req.body.major
	});
	user.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Doctor added successfully',
				addedDoctor: {
					username: result.username,
					firstName: result.firstName,
					lastName: result.lastName,
					email: result.email
				}
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.getDoctor = (req, res, next) => {
	const id = req.params.doctorId;
	console.log(id);
	User.findById(id)
		.select('_id username firstName lastName email phone major')
		.then(doc => {
			if (doc) {
				res.status(200).json({ doctor: doc });
			} else {
				res.status(404)
					.json({ message: 'No valid entry found for provided ID' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.updateDoctor = (req, res, next) => {
	const id = req.params.doctorId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	User.updateOne({ _id: id }, { $set: updateOps })
		.then(result => {
			res.status(200).json({
				message: 'Doctor updated successfully'
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.deleteDoctor = (req, res, next) => {
	const id = req.params.doctorId;
	User.deleteOne({ _id: id })
		.then(result => {
			res.status(200).json({
				message: 'Doctor deleted'
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};