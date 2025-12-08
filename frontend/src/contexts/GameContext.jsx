import { useState, createContext } from "react";
import useCharacters from "../hooks/useCharacters";

export const GameContext = createContext({
    game: null,
    characters: [],
    foundCharacters: [],
    startTime: null,
    elapsedTime: 0,
    isComplete: false,
    error: null,
    loading: true,
    startGame: () => { },
    checkCharacter: () => { },
})

export function GameProvider({ children }) {
    const [game, setGame] = useState(null)
    const [foundCharacters, setFoundCharacters] = useState([])
    const [startTime, setStartTime] = useState(null)
    const [elapsedTime, setElapsedTime] = useState(0)
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
        if (!startTime) return

        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
        }, 100)

        return () => clearInterval(interval)
    }, [startTime])

    const startGame = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/start`, {
                method: 'POST',
            })
            const data = await res.json()
            setStartTime(data.startTime)
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
                setFoundCharacters([...foundCharacters, characterId])
            }

            return data.found
        } catch (err) {
            setError(err.message)
            return false
        }
    }

    const isComplete = game && foundCharacters.length === game.characters.length

    return (
        <GameContext.Provider value={{
            game,
            characters: game?.characters || [],
            foundCharacters,
            startTime,
            elapsedTime,
            isComplete,
            error,
            loading,
            startGame,
            checkCharacter,
        }}>
            {children}
        </GameContext.Provider>
    )
}
