import { useState, useEffect } from "react"

function Leaderboard({ onClose }) {
    const [leaderboard, setLeaderboard] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/leaderboard?limit=10`)
            .then(res => res.json())
            .then(data => {
                setLeaderboard(data.leaderboard)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-neutral-800 border-2 border-cyan-400 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-cyan-300">Leaderboard</h2>
                    <button
                        onClick={onClose}
                        className="text-cyan-400 hover:text-cyan-300 text-2xl font-bold"
                    >
                        X
                    </button>
                </div>

                {loading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : (
                    <div className="space-y-2">
                        {leaderboard.map((entry, index) => (
                            <div
                                key={entry.id}
                                className={`flex justify-between items-center p-4 rounded transition-colors ${index === 0 ? 'bg-yellow-600 border border-yellow-500' :
                                    index === 1 ? 'bg-gray-400 border border-gray-400' :
                                        index === 2 ? 'bg-orange-600 border border-orange-600' :
                                            'bg-neutral-700 hover:bg-neutral-600'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`text-2xl font-bold w-8 ${index === 0 ? 'text-yellow-400' :
                                        index === 1 ? 'text-gray-300' :
                                            index === 2 ? 'text-orange-400' :
                                                'text-cyan-400'
                                        }`}>
                                        {`#${index + 1}`}
                                    </span>
                                    <span className="text-xl text-white font-medium">{entry.username}</span>
                                </div>
                                <span className="text-xl text-cyan-400 font-mono">{formatTime(entry.time_taken)}</span>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default Leaderboard
