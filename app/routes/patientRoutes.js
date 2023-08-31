const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.getPatients);
router.post('/patient', patientController.registerPatient);
router.put('/patient', patientController.updatePatient);
router.get('/patient/:patientId', patientController.getPatient);
router.delete('/patient/:patientId', patientController.deletePatient);
router.get('/waiting-patients', patientController.getWaitingPatients);
router.post('/waiting-patients', patientController.saveWaitingPatients);
router.post('/send-registration-form', patientController.sendRegistrationForm);
router.post('/send-intake-form', patientController.sendIntakeForm);
router.get('/get-registration-form/:patientId', patientController.getRegistrationForm);
router.get('/get-intake-form/:patientId', patientController.getIntakeForm);
router.post('/confirm-registration-form', patientController.confirmRegistrationForm);
router.post('/confirm-intake-form', patientController.confirmIntakeForm);

module.exports = router;