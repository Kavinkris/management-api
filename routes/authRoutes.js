const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/login', AuthController.login);

// Protected routes
router.get('/user/:username', authMiddleware.authenticateToken, UserController.getUserByUsername);

module.exports = router;
