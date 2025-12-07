const { Router } = require('express');
const gameRoutes = require('./gameRoutes');
const userRoutes = require('./userRoutes');
const router = Router();

router.use('/games', gameRoutes);
router.use('/users', userRoutes);

module.exports = router;
