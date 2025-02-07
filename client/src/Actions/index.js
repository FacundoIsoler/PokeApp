import axios from 'axios';


export function getPokemons() {
    return async function (dispatch) {
        var json = await axios.get("/pokemons", {
        });
        console.log(json)
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}
export function quitarFiltros() {
    return async function (dispatch) {
        var json = await axios.get("/pokemons", {

        });
        return dispatch({
            type: 'QUITAR_FILTROS',
            payload: json.data
        })
    }
}

export function getNamePokemon(name) {
    return async function (dispatch) {
        try {
            let json = await axios.get("/pokemons?name=" + name)
            return dispatch({
                type: 'GET_NAME_POKEMON',
                payload: json.data// trae el personaje filtrado desde el back 

            })
        } catch (error) {

            return (alert("You haven't catch that pokemon"), error)
        }
    }
}

export function getTypes() {
    return async function (dispatch) {
        var json = await axios.get("/types", {

        });

        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })
    }
}

export function postPokemon(payload) {
    return async function () {
        // console.log (payload);
        const rta = await axios.post("/pokemons", payload);

        return rta;
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

export function ordenarPorAtaque(payload) {
    return {
        type: 'ORDENAR_POR_ATAQUE',
        payload
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/pokemons/"
                + id);
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
