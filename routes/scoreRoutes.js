const express = require('express');
const scoreController = require('../controllers/scoreController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/save', authMiddleware, scoreController.saveScore);
router.get('/user', authMiddleware, scoreController.getUserScores);

module.exports = router;