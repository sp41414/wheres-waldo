const { Router } = require('express')
const userController = require('../controllers/userController')
const router = Router()

// submit a score (time taken) after completing a game
router.post('/score', userController.submitScore)

// get a leaderboard for a specific game
router.get('/leaderboard/:gameId', userController.getLeaderboard);

// get a specific user by username's rank
router.get('/rank/:gameId/:username', getUserRank);

module.exports = router
