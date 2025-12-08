const db = require('../db/prisma')

const submitScore = async (req, res, next) => {
    try {
        const { username, startTime } = req.body

        const endTime = Date.now()

        const timeTaken = (endTime - startTime) / 1000 // seconds, db stores floats so its alright if i dont Math.floor() it

        // get the game, should be the only one
        const game = await prisma.game.findFirst()

        if (!game) {
            return res.status(404)
        }

        if (timeTaken < 1) {
            return res.status(400).json({
                error: {
                    message: "Invalid time, too fast",
                    timestamp: new Date().toISOString()
                }
            })
        }

        const user = await prisma.user.create({
            data: {
                username,
                time_taken: timeTaken,
                gameId: game.id
            }
        })

        return res.status(201).json({
            user: user,
        })
    } catch (err) {
        next(err)
    }
}

const getLeaderboard = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10

        const leaderboard = await prisma.user.findMany({
            orderBy: {
                time_taken: 'asc',
            },
            take: limit,
            select: {
                id: true,
                username: true,
                time_taken: true
            }
        })

        return res.json({
            leaderboard: leaderboard,
        })
    } catch (err) {
        next(err)
    }
}

const getUserRank = async (req, res, next) => {
    try {
        const { username } = req.params;

        // get user's best time
        const user = await prisma.user.findFirst({
            where: { username },
            orderBy: {
                time_taken: 'asc'
            }
        })

        if (!user) {
            return res.status(404).json({
                error: {
                    message: "User not found",
                    timestamp: new Date().toISOString()
                }
            })
        }

        const betterTimes = await prisma.user.count({
            where: {
                time_taken: {
                    lt: user.time_taken
                }
            }
        })

        const rank = betterTimes + 1;

        res.json({
            rank: rank,
            username: user.username,
            time_taken: user.time_taken
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    submitScore,
    getLeaderboard,
    getUserRank
}
