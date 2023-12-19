const { Router } = require("express");
const {getVideogamesHandler} = require ('../handlers/Videogames/videogamesHandlers');
const getVideogamesByIdHandler = require("../handlers/Videogames/videogamesByIdHandlers");
const {createVideogameHandler} = require ('../handlers/Videogames/postVideogameHandlers')
const router = Router();

router.get("/", getVideogamesHandler);
router.get ("/:id", getVideogamesByIdHandler)
router.post("/", createVideogameHandler)

module.exports = router;