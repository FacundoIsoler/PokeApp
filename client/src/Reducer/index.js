import { filtradoPokemonByStatus, filterCreados } from "../Actions";


const initialState = {
    pokemons: [],
    allPokemons: []
}



export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case 'FILTRADO_POR_VALUE':
            const allPokemons = state.allPokemons
            const statusFilter = action.payload === 'All' ? allPokemons : allPokemons.filter(el => el.types.includes(action.payload) === true)
            // function filtradoFinal(statusFilter){
            //     statusFilter.map(el =>{
            //         return (
            //             <Fragment>
            //                 <Link to = {"/home/" + el.id}>
            //                 <Card name={el.name} img={el.sprites} type={el.types} />
            //                 </Link>
            //             </Fragment>
            //         )
            // //     })
            // }
            return {
                ...state,
                pokemons: statusFilter
            }
        case 'FILTER_CREADO':
            const creadosFilter = action.payload === 'All' ? state.allPokemons : action.payload === 'DB' ? state.pokemons.filter(el => el.id.length > 3) : state.allPokemons.filter(el => el.id < 152)
            return {
                ...state,
                pokemons: creadosFilter
            }

        default:
            return state;
    }
};

