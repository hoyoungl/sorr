const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/:userId', userController.getUserById);
router.get('/', userController.getUserByEmail);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deactivateUser);

module.exports = router;