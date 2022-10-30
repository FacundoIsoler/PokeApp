const { Router } = require('express');
const axios = require ('axios');
const router = Router();
const { Type } = require('../db');

router.get('/', async (req, res, next) => {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    // console.log(typesApi.data.results[0])
    const types = typesApi.data.results.map (t => t.name)
    // console.log(types)
    const tyEach = types.map (t => {
    //    console.log(t)
        for (let i = 0; i < t.length; i++) return t})
    //    console.log(tyEach);
        tyEach.forEach(el => {
            Type.findOrCreate({
                where: {name :el.charAt(0).toUpperCase() + el.substring(1)},
            })
        });
        const allTypes = await Type.findAll();
        res.send(allTypes);
    })

    // let typePromesaApi = axios.get('https://pokeapi.co/api/v2/type');
    // let typePromesaDb = Type.findAll();
    // Promise.all([typePromesaApi, typePromesaDb])
    //     .then((respuesta) => {
    //         const [typeApi, typeDb] = respuesta;
    //         const mapeoApi = typeApi.data.results.map((type) => {
    //             return {
    //                 name: type.name,
    //                 url: type.url
    //             };
    //         })
    //         let todosLosTypes = [...mapeoApi, ...typeDb]
    //         res.status(200).send(todosLosTypes);
    //     }).catch((err) => {
    //         next(err)
    //     })


router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body
        const newType = await Type.create({ name })
        return res.status(200).send(newType)
    } catch (err) {
        next(err);
    }
});

router.put('/', (req, res, next) => {
    res.send('soy put /types');
});

router.delete('/', (req, res, next) => {
    res.send('soy delete /types');
});




module.exports = router;