import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getTypes, postPokemon } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';
import s from '../Stylos/Form.module.css';


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

    function controladora(input) {
        let errors = {};
        if (input.name.length < 1) {
           errors.name = 'Name must be provided'
        } else if (input.life.length < 1) {
           errors.life = 'Life must be provided'
        } else if (input.attack.length < 1) {
            errors.attack = 'Attack must be provided'
         } else if (input.defense.length < 1) {
            errors.defense = 'Defense must be provided'
         } else if(input.speed.length < 1) {
            errors.speed = 'Speed must be provided'
         } else if (input.height.length < 1) {
            errors.height = 'Height must be provided'
         } else if(input.weight.length < 1) {
            errors.weight = 'Weight must be provided'
         }

        return errors
    }

    // console.log( input.life.length)


    function soloNumeros(str) {
        return /[0-9]+/i.test(str);
    }


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
            [e.target.life]: e.target.value,
            [e.target.attack]: e.target.value,
            [e.target.defense]: e.target.value,
            [e.target.speed]: e.target.value,
            [e.target.height]: e.target.value,
            [e.target.weight]: e.target.value,
        })
        setErrors(controladora({
            ...input,
            [e.target.name]: e.target.value,
            [e.target.life]: e.target.value,
            [e.target.attack]: e.target.value,
            [e.target.defense]: e.target.value,
            [e.target.speed]: e.target.value,
            [e.target.height]: e.target.value,
            [e.target.weight]: e.target.value,

        }))
        console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e) {
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
       
        alert ("Pokemon created successfully")
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

console.log(input.life)
    return (
        <div className={s.Form}>
            <Link to='/home'>
                <button>Home</button>
            </Link>
            <h1>Create your pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={s.Nombre}>
                    <label>Nombre:  </label>
                    <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} className={input.name.length >0 && typeof input.name === 'string' ? s.InputAllowed : s.InputObligated } />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div className={s.Vida}>                    
                 <label>Life:  </label>
                    <input type="integer" value={input.life} name= "life" className={String(input.life).length > 0 && String(input.life).search (/[0-9]+/i) !== -1 ? Number(input.life) && s.InputAllowed : s.InputObligated} onChange={(e) => handleChange(e)} />  
                    {!errors.name && input.attack?  (
                        <p className='error'>{errors.life}</p>
                    ) : ""}  
                </div>
                <div className={s.Ataque}>
                    <label>Attack:  </label>
                    <input type="integer" value={input.attack} name="attack" className={String(input.attack).length > 0 && String(input.attack).search (/[0-9]+/i) !== -1 ? Number(input.attack) && s.InputAllowed : s.InputObligated} onChange={(e) => handleChange(e)} />
                    {!errors.name && !errors.life && input.defense?  (
                        <p className='error'>{errors.attack}</p>
                    ) : ""} 
                </div>
                <div className={s.Defensa}>
                    <label>Defense: </label>
                    <input type="integer" value={input.defense} name="defense" className={String(input.defense).length > 0 && String(input.defense).search (/[0-9]+/i) !== -1 ? Number(input.defense) && s.InputAllowed : s.InputObligated} onChange={(e) => handleChange(e)} />
                    {!errors.name && !errors.life && !errors.attack && input.speed?  (
                        <p className='error'>{errors.defense}</p>
                    ) : ""} 
                </div>
                <div className={s.Velocidad}>
                    <label>Speed: </label>
                    <input type="integer" value={input.speed} name="speed" className={String(input.speed).length > 0 && String(input.speed).search (/[0-9]+/i) !== -1 ? Number(input.speed) && s.InputAllowed : s.InputObligated} onChange={(e) => handleChange(e)} />
                    {!errors.name && !errors.life && !errors.attack && !errors.defense && input.height? (
                        <p className='error'>{errors.speed}</p>
                    ) : ""} 
                </div>
                <div className={s.Altura}>                    <label>Height: </label>
                    <input type="integer" value={input.height} name="height" className={String(input.height).length > 0 && String(input.height).search (/[0-9]+/i) !== -1 ? Number(input.height) && s.InputAllowed : s.InputObligated} onChange={(e) => handleChange(e)} />
                    {!errors.name && !errors.life && !errors.attack && !errors.defense && !errors.speed && input.weight?  (
                        <p className='error'>{errors.height}</p>
                    ) : ""} 
                </div>
                <div className={s.Peso}>                    <label>Weight: </label>
                    <input type="integer" value={input.weight} name="weight" className={String(input.weight).length > 0 && String(input.weight).search (/[0-9]+/i) !== -1 ? Number(input.weight) && s.InputAllowed : s.InputObligated} onChange={(e) => handleChange(e)} />
                    {!errors.weight?  (
                        <p className='error'>{errors.weight}</p>
                    ) : ""} 
                </div>
                {
                    !input.name && !input.life && !input.attack && !input.defense && !input.speed && !input.weight
                    ?
                    <p>All fills in red must be provided</p>
                    :
                    ""
                }
                <select onChange={(e) => handleSelect(e)}>
                    {types.map((ty) => (
                        <option value={ty.name}>{ty.name}</option>
                    ))}
                    
                </select>
                <ul><li>{input.types.map(el => el + " ")}</li></ul>
                {
                    input.name.length > 0 && soloNumeros(input.life)
                        ?

                        <button type='submit' >Pokemon create</button>
                        :
                        <button type='submit' disabled >Pokemon create</button>
                }

                
            </form>
            {input.types.map(el =>
                <div className='divTy'>
                    <p>{el}</p>
                    <button className='buttonX' onClick={() => handleDelete(el)}>X</button>
                </div>
            )}
        </div>
    )
}


export default PokemonCreate