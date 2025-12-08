import { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

function NavBar() {
    const { characters, foundCharacters, elapsedTime } = useContext(GameContext)

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <header className="p-4 border-b border-cyan-500">
            <nav className="flex justify-around items-center">
                <h1 className="text-3xl font-bold text-cyan-300">Where's Waldo</h1>

                <div className="text-2xl text-cyan-400 font-mono">
                    {formatTime(elapsedTime)}
                </div>

                <ul className="flex gap-4">
                    {characters.map((character) => {
                        const found = foundCharacters.includes(character.id)
                        return (
                            <li
                                key={character.id}
                                className={`text-2xl transition-all ${found ? 'text-gray-600 line-through' : 'text-cyan-400'}`}
                            >
                                {character.name}
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}

export default NavBar
