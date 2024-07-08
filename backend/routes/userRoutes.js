const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT, authorizeRoles, errorHandler } = require('../middlewares');

// User registration and login do not require authentication
router.post('/register', userController.register);
router.post('/login', userController.login);

// Routes that require authentication and admin role
router.use(authenticateJWT); // Middleware to authenticate all routes below

router.get('/users', authorizeRoles('admin'), userController.getUsers);
router.get('/:id', authorizeRoles('admin'), userController.getUser);
router.put('/:id', authorizeRoles('admin'), userController.updateUser);
router.delete('/:id', authorizeRoles('admin'), userController.deleteUser);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
