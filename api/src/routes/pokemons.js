const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { Pokemon, Type } = require('../db.js')
let {
    obtenerPokemons
} = require("./../Controllers/FindPokemonAPI.js");



const getApiInfo = async () => {
    try {
        const { results } = (
            await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")
        ).data;
        const promisesArray = await Promise.all(
            results.map((p) => axios.get(p.url))
        );
        return promisesArray.map(({ data }) => {
            console.log(data)
            return {
                id: data.id,
                name: data.name.charAt(0).toUpperCase() + data.name.substring(1),
                life: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map((type) => { return type.type.name.charAt(0).toUpperCase() + type.type.name.substring(1) }),
                sprites:
                    data.sprites.other["official-artwork"].front_default ||
                    data.sprites.other["dream_world"].front_default
            };
        });
    } catch (e) {
        return e;
    }
};

const getDbInfo = async () => {
    const pokeFiltro = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attribute: [],
            },
        }
    })
    // console.log(pokeFiltro)

    pokeDB = pokeFiltro.map((poke) => {
        return {
            id: poke.id,
            name: poke.name,
            life: poke.life,
            attack: poke.attack,
            defense: poke.defense,
            speed: poke.speed,
            height: poke.height,
            weight: poke.weight,
            types: poke.types.map((t) => t.name),
            sprites: poke.img,
        };
    });
    //   console.log(pokeDB)
    return pokeDB;
}
const getAllPokemons = async () => {
    const apiDepurada = await getApiInfo();
    const dbDepurada = await getDbInfo();
    const allPokemons = apiDepurada.concat(dbDepurada);
    console.log("allPokemons")
    return allPokemons;
};


router.get('/', async (req, res, next) => {
    const name = req.query.name;
    const todosLosPokemons = await getAllPokemons();
    try {
        if (name) {
            let pokemonName = await todosLosPokemons.filter(el => el.name.toLowerCase().includes(name.toLocaleLowerCase()));
            pokemonName.length ?
                res.status(200).json(pokemonName) :
                res.status(404).send("It is not possible to find that name")

        } else {

            // todosLosPokemons.sort((a, b) => {
            //     return a.name.toLowerCase() > b.name.toLowerCase()? 1 : -1
            // }) //ordenamiento de la a a la z
            //  todosLosPokemons.sort((a, b) => {
            //          return a.name.toLowerCase() < b.name.toLowerCase()? 1 : -1
            //      })//ordenamiento de z a la a
            res.status(200).json(todosLosPokemons);
        }
    } catch (error) {
        res.status(404).send("GET_ALL_POKEMONS_FAILED: " + error.message);
    }
});



router.get('/:idPokemon', async (req, res) => {
    const { idPokemon } = req.params;
    console.log(typeof idPokemon)
    try {
        // console.log("estamos en el try")
        if (isNaN(Number(idPokemon))) {
            // console.log("entró al if")
            const dataDB = await Pokemon.findByPk(idPokemon, { include: Type });
            if (dataDB) {
                res.status(200).json(dataDB);
                console.log(dataDB);
                return;
            }
        } else {
            // console.log("entró al else")
            const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
            // console.log(data)
            const pokemonFinal = {
                id: data.id,
                name: data.name.charAt(0).toUpperCase() + data.name.substring(1),
                life: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map((type) => { return type.type.name.charAt(0).toUpperCase() + type.type.name.substring(1) }),
                sprites:
                    data.sprites.other["dream_world"].front_default ||
                    data.sprites.other["official-artwork"].front_default,
            };
            // console.log("entraste a la data")
            res.status(200).send(pokemonFinal);
        }

    }
    catch (err) {
        res.status(404).send(err)
    }
});



router.post('/', async (req, res, next) => {
    try {
        let { name, life, attack, defense, speed, height, weight, types, img } = req.body
        let newPokemon = await Pokemon.create({ name, life, attack, defense, speed, height, weight })
        for (const type of types) {
            const [{ dataValues: { name } }] = await Type.findAll({ where: { name: type } });
            await newPokemon.addType(name);
        }

        res.status(200).json({ msg: 'Pokemon created successfully', newPokemon })
    } catch (error) {
        next(error)
    }
});

router.put('/', (req, res, next) => {
    res.send('soy put /pokemons');
});

router.delete('/', async (req, res, next) => {

    try {

        res.status(200).send('Pokemon destroyed');
    } catch (error) {
        res.status(404).send("Pokemon doesn't exist");

    }


});








module.exports = router;
