const express = require('express');
const router = express.Router();
// const checkAuth = require('../middleware/auth');

const AppointmentsController = require('../controllers/appointments.controller');

router.get('/', AppointmentsController.getAll);

router.post('/', AppointmentsController.createAppointment);

router.get('/:appId', AppointmentsController.getAppointment);

router.patch('/:appId', AppointmentsController.updateAppointment);

router.delete('/:appId', AppointmentsController.deleteAppointment);

module.exports = router;
