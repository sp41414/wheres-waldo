import { useState, useEffect, useRef, useContext } from "react"
import { GameContext } from "../contexts/GameContext"

function GameImage({ src }) {
    const { characters, foundCharacters, startTime, startGame, checkCharacter } = useContext(GameContext)
    const [visible, setVisible] = useState(false)
    const [relativeCoordinates, setRelativeCoordinates] = useState({ x: 0, y: 0 })
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 })
    const dropdownRef = useRef(null)
    const imageRef = useRef(null)

    const clickHandler = (e) => {
        e.preventDefault()

        if (!startTime) {
            startGame()
        }

        const rect = imageRef.current.getBoundingClientRect()
        const relativeX = (e.clientX - rect.left) / rect.width
        const relativeY = (e.clientY - rect.top) / rect.height

        setRelativeCoordinates({
            x: relativeX * 100,
            y: relativeY * 100
        })
        setDropdownPosition({ x: e.clientX, y: e.clientY })
        setVisible(true)
    }

    const identifyHandler = (character) => async (e) => {
        e.stopPropagation()
        await checkCharacter(character.id, relativeCoordinates.x, relativeCoordinates.y)
        setVisible(false)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
                imageRef.current && !imageRef.current.contains(e.target)) {
                setVisible(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const availableCharacters = characters.filter(char => !foundCharacters.includes(char.id))

    return (
        <main className="relative">
            <img ref={imageRef} src={src} className="cursor-crosshair" alt="find waldo" onClick={clickHandler}></img>
            {visible && availableCharacters.length > 0 && (
                <div ref={dropdownRef} className="fixed bg-neutral-800 border-2 border-cyan-400 rounded-md shadow-lg shadow-cyan-500 p-2 opacity-90" style={{ left: `${dropdownPosition.x}px`, top: `${dropdownPosition.y}px` }}>
                    <ul className="list-none p-0 m-0">
                        {availableCharacters.map((character) => {
                            return (
                                <li key={character.id} className="hover:bg-cyan-900 hover:text-cyan-300 cursor-pointer p-2 transition-colors rounded" onClick={identifyHandler(character)}>
                                    Identify as {character.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </main>
    )
}

export default GameImage
