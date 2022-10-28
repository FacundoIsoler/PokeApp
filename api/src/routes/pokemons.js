const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { Pokemon } = require('../db')

router.get('/api', (req, res, next) => {
    let pokemonPromesaApi = axios.get(' https://pokeapi.co/api/v2/pokemon');
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
            let todosLosPokemons = [...mapeoApi, ...pokemonDb]
            res.send(todosLosPokemons);
        })
});

router.get('/', (req, res, next) => {
    return Pokemon.findAll()
        .then((pokemons) => {
            res.send(pokemons);
        })
        .catch((err) => {
            next(err);
        });
});

// GET /pokemons/{idPokemon}

router.get('/pokemons/{idPokemon}', async (req, res, next) => {
    let { idPokemon } = req.params.id;
    const character = Pokemon.findByPk(pokemons[idPokemon])
    try {

    } catch (error) {

    }
});

//[ ] GET /pokemons?name="...":


router.post('/', async (req, res, next) => {
    try {
        const { name, vida, ataque, defensa, velocidad, altura, peso } = req.body
        const newPokemon = await Pokemon.create({ name, vida, ataque, defensa, velocidad, altura, peso })
        return res.status(200).send(newPokemon)
    } catch (error) {
        next(error)
    }
});

router.put('/', (req, res, next) => {
    res.send('soy put /pokemons');
});

router.delete('/', (req, res, next) => {
    res.send('soy delete /pokemons');
});








module.exports = router;
