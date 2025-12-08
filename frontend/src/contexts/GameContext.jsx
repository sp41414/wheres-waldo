import { useState, createContext, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const GameContext = createContext({
    game: null,
    characters: [],
    foundCharacters: [],
    startTime: null,
    endTime: null,
    elapsedTime: 0,
    isComplete: false,
    isPaused: false,
    error: null,
    loading: true,
    startGame: async () => { },
    checkCharacter: async () => { },
    resetGame: () => { },
    pauseTimer: () => { },
    resumeTimer: () => { },
})

export function GameProvider({ children }) {
    const [game, setGame] = useState(null)
    const [foundCharacters, setFoundCharacters] = useState([])
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game`)
            .then(res => res.json())
            .then(data => {
                setGame(data.game)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (!startTime || isPaused) return

        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
        }, 100)

        return () => clearInterval(interval)
    }, [startTime, isPaused])

    const startGame = async () => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/start`, {
                method: 'POST',
            })
            setStartTime(Date.now())
        } catch (err) {
            setError(err.message)
        }
    }


    const checkCharacter = async (characterId, x, y) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    characterName: game.characters.find(c => c.id === characterId).name,
                    x,
                    y,
                })
            })
            const data = await res.json()

            if (data.found && !foundCharacters.includes(characterId)) {
                const newFound = [...foundCharacters, characterId]
                setFoundCharacters(newFound)
                if (newFound.length === game.characters.length) {
                    setEndTime(Date.now())
                    setIsPaused(true)
                }
            }

            return data.found
        } catch (err) {
            setError(err.message)
            return false
        }
    }

    const resetGame = () => {
        setFoundCharacters([])
        setStartTime(null)
        setEndTime(null)
        setElapsedTime(0)
        setIsPaused(false)
    }

    const pauseTimer = () => setIsPaused(true)
    const resumeTimer = () => setIsPaused(false)

    const isComplete = game && foundCharacters.length === game.characters.length

    return (
        <GameContext.Provider value={{
            game,
            characters: game?.characters || [],
            foundCharacters,
            startTime,
            endTime,
            elapsedTime,
            isComplete,
            isPaused,
            error,
            loading,
            startGame,
            checkCharacter,
            resetGame,
            pauseTimer,
            resumeTimer,
        }}>
            {children}
        </GameContext.Provider>
    )
}
