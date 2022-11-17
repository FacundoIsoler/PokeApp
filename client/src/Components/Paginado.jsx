import React from "react";
import s from '../Stylos/Paginado.module.css'

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
    const pageNumber = [];


    for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumber.push(i+1)
    }

    return (    
        <nav className={s.Nav}>
            <ul className={s.Paginado}>
                {pageNumber &&
                    pageNumber.map(number => (
                        <li key={number} className={s.Pag}>
                        <a onClick={() => paginado(number)}>{number}</a>
                        </li>
            ))}
            </ul>
        </nav >
    )
}
