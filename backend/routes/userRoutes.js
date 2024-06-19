const express = require('express');
const router = express.Router();
const { register, login, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');




router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/addTruck', login);

module.exports = router;
