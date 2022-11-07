import React, {Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../Actions/index.js';
import { Link } from 'react-router-dom';

import Card from './Card.jsx'

export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)

    useEffect(() => {
        dispatch(getPokemons());
    }, [])



    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    return (
        <div>
            <Link to='/pokemons'>Create Pokemon</Link>
            <h1>Estas en Home</h1>
            <button onClick={e => { handleClick(e) }}>
                Volver a cargar todos los Pokemons
            </button>
            <div>
                <select>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select>
                    <option value='all'>Todos</option>
                    <option value='DB'>Creados</option>
                    <option value='API'>Existentes</option>
                </select>
                {
                    allPokemons?.map(el => {
                        return (
                            <Fragment>
                                <Link to = {"/home/" + el.id}>
                                <Card name={el.name} img={el.sprites} type={el.types} />
                                </Link>
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}
// export default function lHome() {
//     return (
//         <div>
//             <h1>Welcome to Home</h1>
//         </div>
//     )
// }