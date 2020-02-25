const express = require('express');
const router = express.Router()
// const multer = require('multer');
// const checkAuth = require('../middleware/auth');

const DoctorsController = require('../controllers/doctors.controller');

// const storage = multer.diskStorage({
// 	destination: function(req, file, cb) {
// 		cb(null, './uploads/');
// 	},
// 	filename: function(req, file, cb) {
// 		cb(null, new Date().getTime() + '-' + file.originalname);
// 	}
// });

// const fileFilter = (req, file, cb) => {
// 	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
// 		cb(null, true);
// 	} else {
// 		cb(new Error('Invalid file'), false);
// 	}
// };

// const upload = multer({
// 	storage: storage,
// 	limits: {
// 		fileSize: 1024 * 1024 * 5
// 	},
// 	fileFilter: fileFilter
// });

router.get('/', DoctorsController.getAll);

router.post('/', DoctorsController.createDoctor);

router.get('/:doctorId', DoctorsController.getDoctor);

router.patch('/:doctorId', DoctorsController.updateDoctor);

router.delete('/:doctorId', DoctorsController.deleteDoctor);

module.exports = router;
