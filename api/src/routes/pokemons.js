const { Router } = require('express');
const router = Router();
const { Pokemon } = require('../db')

router.get('/', (req, res, next) => {
    return Pokemon.findAll()
        .then((pokemons) => {
            res.send(pokemons);
        })
});

router.post('/', async (req, res, next) => {
    const { name, vida, ataque, defensa, velocidad, altura, peso } = req.body
    const newPokemon = await Pokemon.create({name, vida, ataque, defensa, velocidad, altura, peso})
    return res.send(newPokemon)
});

router.put('/', (req, res, next) => {
    res.send('soy put /pokemons');
});

router.delete('/', (req, res, next) => {
    res.send('soy delete /pokemons');
});


// GET /pokemons/{idPokemon}





module.exports = router;
