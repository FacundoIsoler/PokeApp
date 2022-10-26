const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.send( 'soy get /pokemons' );
});

router.post('/', (req, res, next) => {
    res.send( 'soy post /pokemons' );
});

router.put('/', (req, res, next) => {
    res.send( 'soy put /pokemons' );
});

router.delete('/', (req, res, next) => {
    res.send( 'soy delete /pokemons' );
});




module.exports = router;
