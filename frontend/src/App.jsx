import NavBar from "./components/NavBar"
import GameImage from "./components/GameImage"

function App() {
    return (
        <div className="bg-neutral-900 min-h-screen">
            <NavBar />
            <div className="min-h-full flex justify-center items-center">
                <GameImage src={"https://vuss.io/wp-content/uploads/2025/01/Wheres-Waldo-Beach-Super-High-Resolution-scaled.jpg"} characterNames={["Waldo", "Wizard"]} />
            </div>
        </div>
    )
}

export default App
