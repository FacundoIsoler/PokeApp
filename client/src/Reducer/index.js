const initialState = {
    pokemons: [], //provisorio que se modifica según caso 
    allPokemons: [],// fijo que renderiza todos 
    allTypes: [],
    loading: true,
    details: []
}



export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,// duplicar estado para usar uno como provisorio
                loading: false,
            }
        case 'POST_POKEMON':
            return {
                ...state,
            }


        case "GET_DETAILS":
            // console.log(action.payload)
            return {
                ...state,
                details: action.payload
            }

        case 'QUITAR_FILTROS':
            return {
                allPokemons
            }
        case 'GET_NAME_POKEMON':
            return {
                ...state,
                pokemons: action.payload
            };
        case 'ORDENAR_POR_NOMBRE':
            let order = action.payload === 'asc' ?
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1
                    } if (a.name < b.name) {
                        return -1
                    } else return 0;
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name < b.name) {
                        return 1
                    } if (a.name > b.name) {
                        return -1
                    } return 0;
                })
            return {
                ...state,
                pokemons: order,
            }
        case 'ORDENAR_POR_ATAQUE':
            let ordenAtk = action.payload === 'atkAsc' ? state.pokemons.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return 1
                } if (a.attack < b.attack) {
                    return -1
                } else return 0;
            }) :
                state.pokemons.sort(function (a, b) {
                    if (a.attack < b.attack) {
                        return 1
                    } if (a.attack > b.attack) {
                        return -1
                    } return 0;
                })
            return {
                ...state,
                pokemons: ordenAtk,
            }
        case 'GET_TYPES':

            return {
                ...state,
                allTypes: action.payload
            }
        case 'FILTRADO_POR_VALUE':
            const allPokemons = state.allPokemons
            const statusFilter = action.payload === 'All' ? allPokemons : allPokemons.filter(el => el.types.includes(action.payload) === true)
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

