const initialState = {
    pokemons = []
}



function rootReducer (state= initialState) {
    switch (action.type){
        case 'GET_POKEMON':
            return {
                ...state,
                pokemons: action.payload
            }
    }
};



export default rootReducer;