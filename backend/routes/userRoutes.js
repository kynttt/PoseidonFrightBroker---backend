const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT, authorizeRole, errorHandler } = require('../middlewares');

// User registration and login do not require authentication
router.post('/register', userController.register);
router.post('/login', userController.login);

// The following routes require authentication and admin role
router.get('/users', authenticateJWT, authorizeRole('admin'), userController.getUsers);
router.get('/:id', authenticateJWT, authorizeRole('admin'), userController.getUser);
router.put('/:id', authenticateJWT, authorizeRole('admin'), userController.updateUser);
router.delete('/:id', authenticateJWT, authorizeRole('admin'), userController.deleteUser);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
