const {findById, findByIdApi} = require ('../../controllers/Videogames/videogamesByIdControllers')
const isUUID = require("is-uuid");

const getVideogamesByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const videogame = id.length > 10 ? await findById(id) : await findByIdApi(id); 
      if (videogame){       
      return  res.status(200).json(videogame);
      }
    return res.status(400)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

module.exports = getVideogamesByIdHandler
