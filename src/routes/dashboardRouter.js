const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/:userId', dashboardController.getDashboardsByUser);
router.post('/', dashboardController.createDashboard);

module.exports = router;