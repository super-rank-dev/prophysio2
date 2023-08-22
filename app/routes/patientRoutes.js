const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/', patientController.registerPatient);
router.get('/', patientController.getPatients);
// router.get('/:id', patientController.getPatient);
router.get('/waiting-patients', patientController.getWaitingPatients);
router.post('/waiting-patients', patientController.saveWaitingPatients);

module.exports = router;