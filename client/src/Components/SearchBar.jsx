import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemon } from '../Actions';
import s from '../Stylos/SearchBar.module.css'

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
        setName('')
    }

    return (
        < div className={s.SearchBar} >
            <input type="text" placeholder='Search pokemon' onChange={(e) => handleInputName(e)} value={name} className={s.PlaceHolder}/>
            <button type='submit' onClick={(e) => handleSubmitName(e)} className={s.Boton}>Search</button>
        </div >
    )
}