const {findById, findByIdApi} = require ('../../controllers/Videogames/videogamesByIdControllers')
const isUUID = require("is-uuid");

const getVideogamesByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const videogame = isUUID.v4(id) ? await findById(id) : await findByIdApi(id);
      isUUID.v4(id)
        ? res.status(200).json([videogame])
        : res.status(200).json(videogame);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

module.exports =
    getVideogamesByIdHandler
