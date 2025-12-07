export default function NavBar({ characterNames = ["Waldo", "Wizard", "Odlaw", "Odlulu", "Wenda"] }) {
    return (
        <>
            <header className="p-4">
                <nav className="flex justify-around items-center">
                    <h1 className="text-3xl font-bold">Where's Waldo</h1>
                    <div className="characters">
                        <ul className="flex gap-4">
                            {characterNames.map((character) => {
                                return (
                                    <li key={character} className="text-2xl text-gray-400">{character}</li>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}
