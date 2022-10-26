const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.send( 'soy get /tipo' );
});

router.post('/', (req, res, next) => {
    res.send( 'soy post /tipo' );
});

router.put('/', (req, res, next) => {
    res.send( 'soy put /tipo' );
});

router.delete('/', (req, res, next) => {
    res.send( 'soy delete /tipo' );
});




module.exports = router;