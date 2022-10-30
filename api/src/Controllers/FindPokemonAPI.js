const { json } = require("express");
const {axios} = require("axios");
const { Pokemon, Type } = require('./../db')

var pokemons = [];

var types = [];


module.exports = {
    obtenerPokemons: ()=> {
    let pokemonPromesaApi = axios.get(' https://pokeapi.co/api/v2/pokemon?offset=60&limit=60');
    let pokemonPromesaDb = Pokemon.findAll();
    Promise.all([pokemonPromesaApi, pokemonPromesaDb])
        .then((respuesta) => {
            const [pokemonApi, pokemonDb] = respuesta;
            let mapeoApi = pokemonApi.data.results.map((pokemon) => {
                return {
                    name: pokemon.name,
                    url: pokemon.url
                }
            })
            let todosLosPokemons = [...mapeoApi, ...pokemonDb];
            return todosLosPokemons;
        });
    }
// listPokemons: function (namePokemon, shiny){
    
//     let pokemonPromesaApi = axios.get(' https://pokeapi.co/api/v2/pokemon?offset=60&limit=60');
//     let pokemonPromesaDb = Pokemon.findAll();
//     if(namePokemon){
//         let id = pokemons.indexOf(namePokemon)+1;
//         let filtradoPokemon =  !!!!!!!!!!!!!!!iba por aca!!!!!!!!!!!!!!!!!!!!!!!!
//     }
//     Promise.all([pokemonPromesaApi, pokemonPromesaDb])
//         .then((respuesta) => {
//             const [pokemonApi, pokemonDb] = respuesta;
//             let mapeoApi = pokemonApi.data.results.map((pokemon) => {
//                 return {
//                     name: pokemon.name,
//                     url: pokemon.url
//                 }
//             })
//             let todosLosPokemons = [...mapeoApi, ...pokemonDb]
//             res.send(todosLosPokemons);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     }
//     const findPokemonApi = (apiData, method) => {
//         const { data: { sprites: { other: { home: { front_default } } }, name, id, types, stats, height, weight } } = apiData;
//         const final = {
//             id,
//             img: front_default,
//             name,
//             height,
//             weight,
//             types: []
//         }

//         if (method !== 'simple') {
//             stats.forEach(e => final[e.stat.name] = e.base_stat);
//         }

//         types.forEach(e => {
//             final.types.push({
//                 ID: e.slot,
//                 name: e.type.name
//             })
//         })
//         return final;
//     }
}