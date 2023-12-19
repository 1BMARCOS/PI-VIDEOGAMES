const { Videogame, Genre } = require('../../db');

const createVideogameDB = async (name, description, image, released, rating, platforms, genres) => {
  try {
    // Crear el videojuego en la base de datos
    const createdVideogame = await Videogame.create({
      name,
      description,
      image,
      released,
      rating,
      platforms,
    });


    if (genres && genres.length > 0) {
      const genresFromDB = await Genre.findAll({ where: { name: genres } });
      await createdVideogame.addGenres(genresFromDB);
    }

    return createdVideogame;
  } catch (error) {
    throw new Error(`Error al crear el videojuego: ${error.message}`);
  }
};

module.exports = { createVideogameDB };

