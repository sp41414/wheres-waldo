import { useState, useEffect, useRef } from "react"

export default function GameImage({ src, characterNames = ["Waldo", "Wizard", "Odlaw", "Odlulu", "Wenda"] }) {
    const [visible, setVisible] = useState(false)
    const [relativeCoordinates, setRelativeCoordinates] = useState({ x: 0, y: 0 })
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 })
    const dropdownRef = useRef(null)
    const imageRef = useRef(null)

    const clickHandler = (e) => {
        e.preventDefault()

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

    const identifyHandler = (character) => (e) => {
        e.stopPropagation()
        alert(`Placeholder - Identified ${character} at X: ${relativeCoordinates.x.toFixed(2)}%, Y: ${relativeCoordinates.y.toFixed(2)}%`)
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

    return (
        <main className="relative">
            <img ref={imageRef} src={src} className="cursor-crosshair" alt="find waldo" onClick={clickHandler}></img>
            {visible && (
                <div ref={dropdownRef} className="fixed bg-neutral-800 border border-gray-200 rounded-md shadow-lg p-2 opacity-90" style={{ left: `${dropdownPosition.x}px`, top: `${dropdownPosition.y}px` }}>
                    <ul className="list-none p-0 m-0">
                        {characterNames.map((character) => {
                            return (
                                <li key={character} className="hover:bg-neutral-700 cursor-pointer p-2" onClick={identifyHandler(character)}>Identify as {character}</li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </main>
    )
}
