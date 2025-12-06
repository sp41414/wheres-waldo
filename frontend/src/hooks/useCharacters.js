import { useState, useEffect } from "react"

export default function useCharacters() {
    const [characters, setCharacters] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // TODO: Fetch characters to identify from the API
        alert("Placeholder: fetch characters data")
        // TODO: Also fetch the timer somehow (plan later)
    })

    return { characters, error, loading }
}
