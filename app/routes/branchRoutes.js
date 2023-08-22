const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

router.post('/', branchController.registerBranch);
router.get('/', branchController.getBranches);

module.exports = router;