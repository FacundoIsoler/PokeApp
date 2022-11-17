import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getTypes, postPokemon } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';


function controladora(input) {
    let errors = {};
    if (!input.name){
        errors.name = 'Se requiere un nombre'
    } else if (!input.life || input.attack || input.defense || input.speed || input.height || input.weight) { errors.attack= 'Debe rellenar todos los campos'}

    return errors
}


const PokemonCreate = () => {
    let dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.allTypes)
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: []

    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(controladora({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postPokemon(input))
        setInput({
            name: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: []
        });
        history.push('/home')
    }

    function handleDelete(el) {
        setInput({
            ...input,
            types: input.types.filter(ty => ty !== el)
        })
    }

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    return (
        <div>
            <Link to='/home'>
                <button>Home</button>
            </Link>
            <h1>Create your pokemon</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}/>
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Life: </label>
                    <input type="integer" value={input.life} name="life" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Attack: </label>
                    <input type="integer" value={input.attack} name="attack" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Defense: </label>
                    <input type="integer" value={input.defense} name="defense" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Speed: </label>
                    <input type="integer" value={input.speed} name="speed" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Height: </label>
                    <input type="integer" value={input.height} name="height" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Weight: </label>
                    <input type="integer" value={input.weight} name="weight" onChange={(e)=>handleChange(e)}/>
                </div>
                <select onChange={(e)=>handleSelect(e)}>
                    {types.map((ty) => (
                        <option value={ty.name}>{ty.name}</option>
                    ))}
                </select>
                <ul><li>{input.types.map(el =>  el + " ")}</li></ul>
                <br />
                <button type='submit' >Pokemon create</button>
            </form>
            {input.types.map(el => 
            <div className='divTy'>
                <p>{el}</p>
                <button className='buttonX' onClick={()=>handleDelete(el)}>X</button>
            </div>
            )}
        </div>
    )
}


export default PokemonCreate