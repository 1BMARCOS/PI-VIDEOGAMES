const createVideogame = require ('../../controllers/Videogames/postVideogameControllers')

const createVideogamesHandler = async (req, res) => {
    const { name, genre, description, platforms, image, released, rating, createdInDb } =
      req.body;
  
    try {
      const newVideogame = await createVideogame(
        name,
        genre,
        description,
        platforms,
        image,
        released,
        rating,
        createdInDb,
      );
      // res.status(200).json(newPokemon);
      res.status(200).send(`Videogame added to the db`);
      return newVideogame;
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = createVideogamesHandler;