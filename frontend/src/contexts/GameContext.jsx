import { useState, createContext } from "react";
import useCharacters from "../hooks/useCharacters";

export const GameContext = createContext({
    characters: [],
    // will setup timer later
    // timer: 0
})

export function GameProvider({ children }) {
    const { characters, error, loading } = useCharacters()

    return (
        <GameContext.Provider value={{ characters, error, loading }}>
            {children}
        </GameContext.Provider>
    )
}
