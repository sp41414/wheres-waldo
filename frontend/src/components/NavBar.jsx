export default function NavBar({ characterNames = ["Waldo", "Wizard", "Odlaw"] }) {
    return (
        <>
            <header className="p-4 border-b border-cyan-500">
                <nav className="flex justify-around items-center">
                    <h1 className="text-3xl font-bold text-cyan-300">Where's Waldo</h1>
                    <div className="characters">
                        <ul className="flex gap-4">
                            {characterNames.map((character) => {
                                return (
                                    <li key={character} className="text-2xl text-cyan-400/70">{character}</li>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}
