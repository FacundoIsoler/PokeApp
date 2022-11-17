import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filtradoPokemonByStatus, filterCreados, getTypes, ordenarPorNombre, ordenarPorAtaque } from '../Actions/index.js';
import { Link } from 'react-router-dom';

import Card from './Card.jsx'
import Paginado from './Paginado.jsx';
import SearchBar from './SearchBar.jsx';
import Loading from './Loading.jsx';

export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.allTypes)
    const loading = useSelector((state) => state.loading)
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

    function handleOrdenarPorNombre(e) {
        e.preventDefault();
        dispatch(ordenarPorNombre(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)

    }

    function handleOrdenarPorAtaque(e) {
        e.preventDefault();
        dispatch(ordenarPorAtaque(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    // console.log(allTypes.map(e => e.name))
    return (
        <div>
            {
                !loading
                    ?
                    <div>
                        <Link to='/pokemons'>Create your pokemon</Link>
                        <h1>Estas en Home</h1>
                        <button onClick={e => { handleClick(e) }}>
                            Quitar filtros
                        </button>
                        <div>
                            <select onChange={e => handleOrdenarPorNombre(e)}>
                                <option value='asc'>Ascendente</option>
                                <option value='desc'>Descendente</option>
                            </select>

                            <select onChange={e => handleOrdenarPorAtaque(e)}>
                                <option value='atkAsc'>Ataque Ascendente</option>
                                <option value='atkDesc'>Ataque Descendente</option>
                            </select>

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
                            <SearchBar />


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
                    :
                    <Loading/>
            }
        </div>
    )
}