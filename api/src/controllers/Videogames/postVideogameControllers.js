const { Videogame, Genre, Videogame_Genre } = require('../../db');

const createVideogameDB = async (name, description, image, released, rating, platforms, genres) => {
  try {
    
    const createdVideogame = await Videogame.create({
      name,
      description,
      image,
      released,
      rating,
      platforms,
    });

    if (createdVideogame){
      await Promise.all(genres.map(async(genres)=>{
        const genreId = await Genre.findOne({where: {name:genres}})

        if (genreId){
          await Videogame_Genre.create({
            videogameId: createdVideogame.id,
            genreId: genreId.id
          })
        }
        return createdVideogame;
      }))
    }
    
  } catch (error) {
    throw new Error(`Error al crear el videojuego: ${error.message}`);
  }
};

module.exports = { createVideogameDB };

