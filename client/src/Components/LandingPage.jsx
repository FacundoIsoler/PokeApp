import React from 'react'
import { Link } from 'react-router-dom';
import s from '../Stylos/LandingPage.module.css'





export default function landingPage() {
    return (
    
        <div className={s.LandingPage}>
            <div className={s.Welcome}></div>
            <h2 className={s.Push}>Please push the pokeball center</h2>
            <div className={s.Foto}> 
            <Link to='/home'>
                <button className={s.boton}></button>
            </Link>
            </div>
        </div>
    )
}