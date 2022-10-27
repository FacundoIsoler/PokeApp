const { Router } = require('express');
const router = Router();
const {Type} = require('../db');

router.get('/', (req, res, next) => {
    return Type.findAll()
        .then((types) => {
            res.status(200).send(types);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body
        const newType = await Type.create({name})
        return res.status(200).send(newType)
    } catch (err) {
        next(err);
    }
});

router.put('/', (req, res, next) => {
    res.send( 'soy put /types' );
});

router.delete('/', (req, res, next) => {
    res.send( 'soy delete /types' );
});




module.exports = router;