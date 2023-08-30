const ejs = require('ejs');

const mailService = require('../services/mailService');

// Load Input Validation
const validatePatientInput = require('../validation/patient');

// Load Patient model
const Patient = require('../models/patient');
const Appointment = require('../models/appointment');
const RegistrationForm = require('../models/registration_form');
const IntakeForm = require('../models/intake_form');
const WaitingPatient = require('../models/waiting_patient');
const { BodyPart } = require('../../config/enum');
const patient = require('../validation/patient');

// @route   POST api/patients
// @desc    Register patient
// @access  Public
exports.registerPatient = async (req, res) => {
    const { errors, isValid } = validatePatientInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const patient = await Patient.findOne({ email: req.body.email });

    if (patient) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
    } else {
        const newRegistrationForm = new RegistrationForm({
            title: '',
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            mobilePhone: req.body.phoneNumber,
            homeAddress: req.body.address
        });
        const registrationForm = await newRegistrationForm.save();
        const newIntakeForm = new IntakeForm({
            data: BodyPart.map(bodyPart => ({ bodyPart }))
        });
        const intakeForm = await newIntakeForm.save();
        const newPatient = new Patient({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            emergencyContact: req.body.emergencyContact,
            registrationForm: registrationForm.id,
            intakeForm: intakeForm.id
        });
        const patient = await (await (await newPatient.save())
            .populate('registrationForm'))
            .populate('intakeForm');
        res.json(patient);
        mailService.sendRegistrationForm({ patient });
    };
}

// @route   DELETE api/patients/:patientId
// @desc    Delete patient
// @access  Public
exports.deletePatient = async (req, res) => {
    const { patientId } = req.params;
    await Patient.findOneAndRemove({ _id: patientId });
    await Appointment.deleteMany({ patientId });
    res.json({ success: true });
}

// @route   GET api/patients/waiting-patients
// @desc    Get Waiting Patients
// @access  Public
exports.getWaitingPatients = async (req, res) => {
    // Find all waiting patients
    if (WaitingPatient.countDocuments() <= 0) {
        return res.json([]);
    }
    const waitingPatients = await WaitingPatient.aggregate([
        {
            $lookup: {
                from: "patients",
                localField: "patient",
                foreignField: "_id",
                as: "patient"
            }
        },
        {
            $addFields: {
                patient: { $arrayElemAt: ["$patient", 0] }
            }
        },
        {
            $replaceRoot: {
                newRoot: "$patient"
            }
        }
    ]);
    res.json(waitingPatients);
};

// @route   POST api/patients/waiting-patients
// @desc    Save Waiting Patients
// @access  Public
exports.saveWaitingPatients = async (req, res) => {
    await WaitingPatient.deleteMany();
    const { waitingPatients } = req.body;
    for (let i = 0; i < waitingPatients.length; i++) {
        const patient = waitingPatients[i];
        const newWaitingPatient = new WaitingPatient({ patient: patient._id });
        await newWaitingPatient.save();
    };
    res.json({ success: true });
}

// @route   POST api/confirm-registration-form
// @desc    Confirm Registration Form
// @access  Public
exports.confirmRegistrationForm = async (req, res) => {
    // const { errors, isValid } = validatePatientInput(req.body);
    const errors = {};
    const isValid = true;

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { patientId, registrationForm } = req.body;

    const patient = await Patient.findById(patientId);

    if (!patient) {
        errors.patient = 'You are not registered yet';
        return res.status(404).json(errors);
    } else {
        const updatedRegistrationForm = await RegistrationForm.findOneAndUpdate(
            { _id: patient.registrationForm },
            { $set: registrationForm }
        );
        res.json(updatedRegistrationForm);
    };
}

// @route   POST api/confirm-intake-form
// @desc    Confirm intake form
// @access  Public
exports.confirmIntakeForm = async (req, res) => {
    // const { errors, isValid } = validatePatientInput(req.body);
    const errors = {};
    const isValid = true;

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { patientId, intakeForm } = req.body;

    const patient = await Patient.findById(patientId);

    if (!patient) {
        errors.patient = 'You are not registered yet';
        return res.status(404).json(errors);
    } else {
        const updatedIntakeForm = await IntakeForm.findOneAndUpdate(
            { _id: patient.intakeForm },
            { $set: intakeForm }
        );
        res.json(updatedIntakeForm);
    };
}

// @route   GET api/patients
// @desc    Get Patients
// @access  Public
exports.getPatients = async (req, res) => {
    // Find all patients
    const patients = await Patient.aggregate([
        {
            $lookup: {
                from: "registration_forms",
                localField: "registrationForm",
                foreignField: "_id",
                as: "registrationForm"
            }
        },
        {
            $lookup: {
                from: "intake_forms",
                localField: "intakeForm",
                foreignField: "_id",
                as: "intakeForm"
            }
        },
        {
            $addFields: {
                registrationForm: { $arrayElemAt: ["$registrationForm", 0] },
                intakeForm: { $arrayElemAt: ["$intakeForm", 0] }
            }
        }
    ]);
    res.json(patients);
};

// @route   GET api/patients/:patientId
// @desc    Get Patient
// @access  Public
exports.getPatient = async (req, res) => {
    const errors = {};

    const { patientId } = req.params;

    // Find patient by id
    const patient = await Patient.findById(patientId);
    // Check for patient
    if (!patient) {
        errors.msg = 'Patient not found';
        return res.status(404).json(errors);
    }
    res.json(patient);
};

// @route   POST api/send-registration-form
// @desc    Send Registration Form
// @access  Public
exports.sendRegistrationForm = async (req, res) => {
    const { patientId } = req.body;
    const patient = await Patient.findById(patientId);
    mailService.sendRegistrationForm({ patient });
}

// @route   GET api/get-registration-form/:patientId
// @desc    Get Registration Form
// @access  Public
exports.getRegistrationForm = async (req, res) => {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);
    const registrationForm = await RegistrationForm.findById(patient.registrationForm);
    res.json(registrationForm);
}

// @route   POST api/send-intake-form
// @desc    Send Intake Form
// @access  Public
exports.sendIntakeForm = async (req, res) => {
    const { patientId } = req.body;
    const patient = await Patient.findById(patientId);
    mailService.sendIntakeForm({ patient });
}

// @route   GET api/get-intake-form/:patientId
// @desc    Get Intake Form
// @access  Public
exports.getIntakeForm = async (req, res) => {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);
    const intakeForm = await IntakeForm.findById(patient.intakeForm);
    res.json(intakeForm);
}