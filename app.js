const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

// Get the environment variables
require('dotenv/config');

// Define the routes
const doctorRoutes = require('./api/routes/doctors.route');
const appointmentRoutes = require('./api/routes/appointments.route');

// MongoDB connect
mongoose.set('useCreateIndex', true);
mongoose
	.connect('mongodb://' + process.env.MONGO_SERVER + '/' + process.env.DBNAME, { useNewUrlParser: true })
	.catch(function(err) {
		console.log('Unable to connect to the mongodb instance. Error: ', err);
	});

app.use(morgan('dev'));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// Use the routes
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 	);
// 	if (req.method === 'OPTIONS') {
// 		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
// 		return res.status(200).json({});
// 	}
// 	next();
// });

app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

// app.use((req, res, next) => {
// 	const error = new Error('Not found');
// 	error.status = 404;
// 	next(error);
// });

// app.use((error, req, res, next) => {
// 	res.status(error.status || 500);
// 	res.json({
// 		error: {
// 			message: error.message
// 		}
// 	});
// });

module.exports = app;
