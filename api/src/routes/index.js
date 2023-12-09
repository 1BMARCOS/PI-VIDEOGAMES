const { Router } = require('express');

const videogamesRouter = require ('./videogamesRouter')
const genresRouter = require ('./genreRouter')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRouter)
router.use('/genres', genresRouter)


module.exports = router;
