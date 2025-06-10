const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/', emailController.createEmail);
router.get('/:emailId', emailController.getEmailById);
router.get('/user/:userId', emailController.getEmailsByUser);
router.put('/:emailId', emailController.updateEmail);
router.delete('/:emailId', emailController.deleteEmail);

module.exports = router;