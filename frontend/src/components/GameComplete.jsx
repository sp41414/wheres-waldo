import { useState } from "react"

function GameComplete({ startTime, endTime, onClose, onSkip }) {
    const [username, setUsername] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [rank, setRank] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username.trim()) {
            setError("Please enter a username")
            return
        }

        const actualDuration = endTime - startTime
        const adjustedStartTime = Date.now() - actualDuration

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username.trim(),
                    startTime: adjustedStartTime,
                })
            })

            if (!res.ok) {
                throw new Error('Failed to submit score')
            }

            const rankRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/rank/${username.trim()}`)
            const rankData = await rankRes.json()

            setRank(rankData.rank)
            setSubmitted(true)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            {submitted && (
                <div className="fixed inset-0 bg-black flex items-center justify-center">
                    <div className="bg-neutral-800 border-2 border-cyan-400 rounded-lg p-8 max-w-md w-full mx-4">
                        <h2 className="text-3xl font-bold text-cyan-300 mb-4 text-center">Score Submitted!</h2>
                        <p className="text-xl text-white mb-6 text-center">
                            You ranked <span className="text-cyan-400 font-bold">#{rank}</span> on the leaderboard!
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded transition-colors"
                        >
                            View Leaderboard
                        </button>
                    </div>
                </div>
            )}
            {!submitted && (
                <div className="fixed inset-0 bg-black flex items-center justify-center">
                    <div className="bg-neutral-800 border-2 border-cyan-400 rounded-lg p-8 max-w-md w-full mx-4">
                        <h2 className="text-3xl font-bold text-cyan-300 mb-4 text-center">You Found Everyone!</h2>
                        <p className="text-lg text-white mb-6 text-center">
                            Enter your name to save your score to the leaderboard
                        </p>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full bg-neutral-700 border border-cyan-500 text-white px-4 py-3 rounded mb-4 focus:outline-none focus:border-cyan-400"
                                maxLength={20}
                            />

                            {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded transition-colors"
                                >
                                    Submit Score
                                </button>
                                <button
                                    type="button"
                                    onClick={onSkip}
                                    className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-3 px-4 rounded transition-colors"
                                >
                                    Skip
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default GameComplete
