const { Videogame, Genre } = require('../../db')
const { getAllVideogames } = require('./videogamesControllers')

const findById = async (id) => {
  console.log("Es de la db");
  const videogame = await Videogame.findOne({ where: { id }, include: Genre });
  if (videogame) {

    const finalGenres = videogame.genres.map((genre) => {
      return genre.name
    })
    console.log(finalGenres);
    const gameFilter = {
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      image: videogame.image,
      released: videogame.released,
      rating: videogame.rating,
      platforms: videogame.platforms,
      genres: finalGenres
    }
    return gameFilter;
  }
}


const findByIdApi = async (id) => {
  try {
    console.log("es de la api");
    const videogames = await getAllVideogames();
    const videogame = videogames.find((v) => v.id == id);

    if (videogame) return videogame;
    else throw new Error("Cannot find Videogame by Id");
  } catch (error) {

    throw error;
  }
};


module.exports = {
  findById,
  findByIdApi
}