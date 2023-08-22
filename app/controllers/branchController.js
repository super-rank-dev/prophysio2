// Load Input Validation
// const validateRegisterInput = require('../validation/register');
// const validateLoginInput = require('../validation/login');

// Load Branch model
const Branch = require('../models/branch');

// @route   POST api/branches/
// @desc    Register branch
// @access  Public
exports.registerBranch = async (req, res) => {
    // const { errors, isValid } = validateRegisterInput(req.body);
    const errors = {};
    const isValid = true;

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newBranch = new Branch(req.body);
    const branch = await newBranch.save();
    res.json(branch);
}

// @route   GET api/branches
// @desc    Get Branches
// @access  Public
exports.getBranches = async (req, res) => {
    // const { errors, isValid } = validateLoginInput(req.body);
    const errors = {};
    const isValid = true;

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Find all branches
    const branches = await Branch.find();
    res.json(branches);
};