import { useContext, useState, useEffect } from "react"
import NavBar from "./components/NavBar"
import GameImage from "./components/GameImage"
import GameComplete from "./components/GameComplete"
import Leaderboard from "./components/Leaderboard"
import { GameContext } from "./contexts/GameContext"

export default function App() {
    const { game, isComplete, startTime, endTime, loading, resetGame, pauseTimer } = useContext(GameContext)
    const [showLeaderboard, setShowLeaderboard] = useState(false)
    const [showComplete, setShowComplete] = useState(false)

    useEffect(() => {
        if (isComplete) {
            setShowComplete(true)
            pauseTimer()
        }
    }, [isComplete, pauseTimer])

    const handleCompleteClose = () => {
        setShowComplete(false)
        setShowLeaderboard(true)
        resetGame()
    }

    const handleSkip = () => {
        setShowComplete(false)
        resetGame()
    }

    return (
        <div className="bg-neutral-900 min-h-screen flex flex-col">
            <NavBar />

            {loading && (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-cyan-400 text-2xl">Loading game...</p>
                </div>
            )}

            {!loading && !game && (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-red-400 text-2xl">Error: Game data could not be loaded.</p>
                </div>
            )}

            {!loading && game && (
                <div className="flex-1 flex flex-col items-center py-8">
                    <div className="mb-8">
                        <GameImage src={game.imageBoardSource} />
                    </div>

                    <button
                        onClick={() => setShowLeaderboard(true)}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded transition-colors cursor-pointer"
                    >
                        View Leaderboard
                    </button>

                    {showComplete && (
                        <GameComplete
                            startTime={startTime}
                            endTime={endTime}
                            onClose={handleCompleteClose}
                            onSkip={handleSkip}
                        />
                    )}

                    {showLeaderboard && (
                        <Leaderboard onClose={() => setShowLeaderboard(false)} />
                    )}
                </div>
            )}
        </div>
    )
}
