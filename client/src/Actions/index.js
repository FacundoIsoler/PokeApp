import axios from 'axios';


export function getPokemons (){
    return  async function (dispatch) {
        var json = await axios.get ("http://localhost:3001/pokemons",{

        });
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

// export const getPokemons = () => {
//     return function (dispatch) {
//         axios.get ("http://localhost:3001/pokemons")
//         .then((pokemons) => {
//             dispatch({
//                 type: 'GET_POKEMONS',
//                 payload: pokemons.data}
//             )
//         })}
//     }