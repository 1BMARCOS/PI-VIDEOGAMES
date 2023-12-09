const { Router } = require("express");
const getVideogamesHandler = require ('../handlers/Videogames/videogamesHandlers');
const getVideogamesByIdHandler = require("../handlers/Videogames/videogamesByIdHandlers");
const getVideogamesByNameHandler = require ('../handlers/Videogames/videogamesByNameHandlers')
const createVideogamesHandler = require ('../handlers/Videogames/postVideogameHandlers')
const router = Router();

router.get("/", getVideogamesHandler);
router.get ("/:id", getVideogamesByIdHandler)
router.get ("/name", getVideogamesByNameHandler)
router.post("/", createVideogamesHandler)

module.exports = router;