const { Router } = require('express')
const userController = require('../controllers/userController')
const router = Router()

// submit a score (time taken) after completing a game
router.post('/score', userController.submitScore)

// get leaderboard 
router.get('/leaderboard', userController.getLeaderboard);

// get specific user by username's rank 
router.get('/rank/:username', userController.getUserRank);

module.exports = router
