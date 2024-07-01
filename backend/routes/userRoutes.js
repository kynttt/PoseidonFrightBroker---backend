const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT, authorizeRole, errorHandler } = require('../middlewares');

// User registration and login do not require authentication
router.post('/register', userController.register);
router.post('/login', userController.login);

// The following routes require authentication and admin role
router.get('/users', authenticateJWT, authorizeRole(true), userController.getUsers);
router.get('/:id', authenticateJWT, authorizeRole(true), userController.getUser);
router.put('/:id', authenticateJWT, authorizeRole(true), userController.updateUser);
router.delete('/:id', authenticateJWT, authorizeRole(true), userController.deleteUser);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
