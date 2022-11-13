import axios from 'axios';


export function getPokemons() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/pokemons", {

        });
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function getTypes() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/types",{

        });

        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })
    }
}

export function filtradoPokemonByStatus(payload) {
    // console.log(payload);
    return {
        type: 'FILTRADO_POR_VALUE',
        payload
    }
}


export function filterCreados(payload) {
    // console.log(payload)
    return {
        type: 'FILTER_CREADO',
        payload
    }
}


export function ordenarPorNombre(payload) {
    return {
        type: 'ORDENAR_POR_NOMBRE',
        payload
    }
}