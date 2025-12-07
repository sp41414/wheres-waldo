const { Router } = require('express');
const gameController = require('../controllers/gameController');

const router = Router();

// create a new game
router.post('/', gameController.createGame);

// get game details (without character positions)
router.get('/:id', gameController.getGame);

// check if the correct character was clicked 
router.post('/check', gameController.checkCharacter);

// get game progress (which characters are found)
router.get('/:id/progress', gameController.getGameProgress);

// start game timer - returns server timestamp
router.post('/start', gameController.startGame);

module.exports = router;
