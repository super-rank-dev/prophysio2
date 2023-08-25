const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/', patientController.registerPatient);
router.get('/', patientController.getPatients);
router.delete('/:patientId', patientController.deletePatient);
router.get('/waiting-patients', patientController.getWaitingPatients);
router.post('/waiting-patients', patientController.saveWaitingPatients);
router.post('/send-registration-form', patientController.sendRegistrationForm);
router.post('/send-intake-form', patientController.sendIntakeForm);
router.post('/confirm-registration-form', patientController.confirmRegistrationForm);
router.post('/confirm-intake-form', patientController.confirmIntakeForm);

module.exports = router;