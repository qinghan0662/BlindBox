const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth');
const { authenticate } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);

module.exports = router;