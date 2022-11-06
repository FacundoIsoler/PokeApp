import React from 'react'
import { Link } from 'react-router-dom';





export default function landingPage() {
    return (
        <div>
            <h1>Welcome to Pokemons World</h1>
            <Link to='/home'>
                <button>Get in</button>
            </Link>
        </div>
    )
}