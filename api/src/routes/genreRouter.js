const { Router } = require("express");
const {findAllGenresHandler} = require ('../handlers/Genres/genreHandlers')

const router = Router();

router.get("/", findAllGenresHandler );

module.exports = router;