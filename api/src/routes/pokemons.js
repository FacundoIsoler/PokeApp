const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { Pokemon, Type } = require('../db.js')
let {
    obtenerPokemons
} = require("./../Controllers/FindPokemonAPI.js");



    const getApiInfo = async () => {
        try {
          const {results} = (
            await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")
          ).data;
          const promisesArray = await Promise.all(
            results.map((p) => axios.get(p.url))
          );
      
          return promisesArray.map(({data}) => {
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
                data.sprites.other["dream_world"].front_default ||
                data.sprites.other["official-artwork"].front_default,
            };
          });
        } catch (e) {
          return e;
        }
      };

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attribute: [],
            },
        }
    })
}
const getAllPokemons = async () => {
    const apiDepurada = await getApiInfo();
    const dbDepurada = await getDbInfo();
    const allPokemons = apiDepurada.concat(dbDepurada);
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
            res.status(200).json(todosLosPokemons);
        }
    } catch (error) {
        res.status(404).send("GET_ALL_POKEMONS failed" + error.message);
    }
});



// router.get('/:idPokemon', async (req, res) => {
//     const { idPokemon } = req.params;
//     try {
//         if (idPokemon === "String") {
//             const dataDB = await Pokemon.findByPk(idPokemon, { include: Type });
//             if (dataDB) {
//                 res.status(200).json(dataDB);
//                 return;
//             }
//         } else {

//             const result = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
//             const apiInfo = await result.data.map(el=> {
//                 return{
//                     id: el.id,
//                     name: el.name,
//                     altura: el.height,
//                     stats: el.stats.map(el=>{
//                         return{

//                         }
//                     }
//                 }


//                     })

//                 }

//             // console.log(result);
//             res.status(200).json(apiInfo);
//         };
//     }

//     catch (error) {
//         // console.log(error)
//         res.status(404).json("estas adentro")
//     }
// })



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
