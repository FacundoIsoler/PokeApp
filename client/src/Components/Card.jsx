import React from 'react';
import s from '../Stylos/Card.module.css'




export default function Card ({name, img, type, id, life}) {
    return (
        <div className={s.Card}>
            <h3 className={s.Nombre}>{name}</h3>
            <h5 className={s.Tipo}>{type.map((ty)=> ty + '  ')}</h5>
            <h2 >{life}</h2>
            <img src={img} alt= "img not found"  className={s.Imagen}/>
        </div>
    );
}