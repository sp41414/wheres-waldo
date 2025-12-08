const { Router } = require('express');
const gameController = require('../controllers/gameController');

const router = Router();

// get the game (single game in DB)
router.get('/', gameController.getGame);

// check if the correct character was clicked 
router.post('/check', gameController.checkCharacter);

// start game timer - returns server timestamp
router.post('/start', gameController.startGame);

module.exports = router;
