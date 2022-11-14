import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemon } from '../Actions';

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputName(e) {
        e.preventDefault()
        setName(e.target.value)
        //console.log(name)
    }

 
    function handleSubmitName(e) {
        e.preventDefault()
        dispatch(getNamePokemon(name))
    }

    return (
        < div >
            <input type="text" placeholder='Buscar pokemon' onChange={(e) => handleInputName(e)} />
            <button type='submit' onClick={(e) => handleSubmitName(e)}>Buscar</button>
        </div >
    )
}