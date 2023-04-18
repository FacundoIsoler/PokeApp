import React from "react";
import s from '../Stylos/Paginado.module.css'

function nextPrevButton (){
    
}


function handleOrdenarPorAtaque(e) {
    e.preventDefault();
    dispatch(ordenarPorAtaque(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
    const pageNumber = [];


    for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumber.push(i+1)
    }

    return (    
        <nav className={s.Nav}>
            <button>prev</button>
            <ul className={s.Paginado}>
                {pageNumber &&
                    pageNumber.map(number => (
                        <li key={number} className={s.Pag}>
                        <p onClick={() => paginado(number)}>{number}</p>
                        </li>
            ))}
            </ul>
            <button>next</button>
        </nav >
        
    )
}
