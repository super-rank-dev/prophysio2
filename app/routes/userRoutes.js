const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userContoller');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/current', passport.authenticate('jwt', { session: false }), userController.currentUser);
router.get('/', userController.getUsers);

module.exports = router;