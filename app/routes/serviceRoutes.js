const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.post('/', serviceController.registerService);
router.get('/', serviceController.getServices);

module.exports = router;