import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filtradoPokemonByStatus, filterCreados, getTypes, ordenarPorNombre } from '../Actions/index.js';
import { Link } from 'react-router-dom';

import Card from './Card.jsx'
import Paginado from './Paginado.jsx';

export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.allTypes)
    const [orden, setOrden] = useState('')// crea estado local vacío
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonPerPage] = useState(12)
    const indiceUltimoPokemon = currentPage * pokemonsPerPage//12
    const indicePrimerPokemon = indiceUltimoPokemon - pokemonsPerPage// 0
    const pokemonsPaginaActual = allPokemons.slice(indicePrimerPokemon, indiceUltimoPokemon)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFiltradoStatus(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filtradoPokemonByStatus(e.target.value))
    }


    function handleFilterCreados(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterCreados(e.target.value))
    }

    function handleOrdenarPorNobre(e) {
        e.preventDefault();
        dispatch(ordenarPorNombre(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)

    }
    // console.log(allTypes.map(e => e.name))
    return (
        <div>
            <Link to='/pokemons'>Create Pokemon</Link>
            <h1>Estas en Home</h1>
            <button onClick={e => { handleClick(e) }}>
                Volver a cargar todos los Pokemons
            </button>
            <div>
                <select onChange={e => handleOrdenarPorNobre(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>


                {/* cambiar por un .map */}
                <select name="selectType" id="selectType" onChange={e => handleFiltradoStatus(e)}>
                    <option value="All">All</option>
                    {allTypes.map(t =>
                        <option value={t.name}>{t.name}</option>

                    )}

                </select>

                <select onChange={e => handleFilterCreados(e)}>
                    <option value='All'>All</option>
                    <option value='DB'>Creados</option>
                    <option value='API'>Existentes</option>
                </select>
                <br />
                <input type="text" />



                <Paginado
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                />

                {
                    pokemonsPaginaActual?.map(el => {
                        return (
                            <Fragment>
                                <Link to={"/home/" + el.id}>
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