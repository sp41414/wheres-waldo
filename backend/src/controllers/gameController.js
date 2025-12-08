const db = require('../db/prisma');

const getGame = async (req, res, next) => {
    try {
        const game = await prisma.game.findFirst({
            include: {
                characters: {
                    select: {
                        id: true,
                        name: true,
                        imageSource: true,
                        // dont send x/y pos to prevent cheating
                        // isFound is per session so
                    }
                }
            }
        })
        if (!game) {
            return res.status(404).json({
                error: {
                    message: "Game not found",
                    timestamp: new Date().toISOString()
                }
            })
        }

        res.json({
            game: game,
            message: "Game found successfully"
        })
    } catch (err) {
        next(err)
    }
}

const checkCharacter = async (req, res, next) => {
    try {
        const { characterName, x, y } = req.body;
        const character = await prisma.characters.findUnique({
            where: {
                name: characterName
            }
        })

        if (!character) {
            return res.status(404).json({
                error: {
                    message: "Character not found",
                    timestamp: new Date().toISOString()
                }
            })
        }

        // 5% radius
        const tolerance = 5;
        const isFound = Math.abs(x - character.XPosition) <= tolerance && Math.abs(y - character.YPosition) <= tolerance

        return res.json({
            found: isFound,
            characterId: character.id,
            name: character.name
        })
    } catch (err) {
        next(err)
    }
}

const startGame = async (req, res, next) => {
    try {
        const startTime = Date.now()

        res.json({
            startTime: startTime
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getGame,
    checkCharacter,
    startGame
}
