const { Router } = require('express');
const pokemonRoute = require('./pokemons');
const tipoRoute = require('./tipo');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/pokemons', pokemonRoute);
router.use('/tipo', tipoRoute);

module.exports = router;
