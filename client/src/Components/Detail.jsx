import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDetail } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading'

import s from '../Stylos/Detail.module.css'



export default function Detail(props) {
    console.log(props)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch, props.match.params.id])

    const myPokemon = useSelector((state) => state.details)
    // console.log(myPokemon)
    return (
        <div className={s.Page}>
            {
          
                props.match.params.id == myPokemon.id ?
                    <div className={s.Pokedex}>
                        <h1 className={s.Nombre}> {myPokemon.name} </h1>
                        <div className={s.ImagenPoke}>
                            <img src={myPokemon.img ? myPokemon.img : myPokemon.sprites}/>
                        </div>
                        <div className={s.Detalle}>
                            <p>Life: {myPokemon.life}</p>
                            <p>Attack: {myPokemon.attack}</p>
                            <p>Defense: {myPokemon.defense}</p>
                            <p>Speed: {myPokemon.speed}</p>
                            <p>Height: {myPokemon.height}</p>
                            <p>Weight: {myPokemon.weight}</p>
                            <p>Types: {myPokemon.id <40? myPokemon.types.map((ty) => ty + ' '): myPokemon.types.map((ty) => ty.name + ' ')}</p>
                        </div>
                    </div> : <Loading/>
            }
            <Link to={'/home'} className={s.Volver}>Home</Link>
        </div>
    )
}
