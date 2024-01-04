const { Videogame, Genre } = require('../../db')
const { getAllVideogames } = require('./videogamesControllers')
const axios = require ('axios')
const { API_KEY } = process.env;
const findById = async (id) => {
  console.log("Es de la db");
  const videogame = await Videogame.findOne({ where: { id }, include: Genre });
  if (videogame) {

    const finalGenres = videogame.genres.map((genre) => {
      return genre.name
    })
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
    const videogames = (await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`))
    .data;
    
    if (videogames) {

      const finalVideogames = videogames.genres.map((genres) => {
        return genres.name
      })
      const finalGames = videogames.platforms.map((platforms) => {
        return platforms.platform.name
      })
      console.log(finalVideogames);
      const gameFilt = {
        id: videogames.id,
        name: videogames.name,
        description: videogames.description,
        image: videogames.background_image,
        released: videogames.released,
        rating: videogames.rating,
        platforms: finalGames.join(', '),
        genres: finalVideogames
      }
      return gameFilt;
    }
    else throw new Error("Cannot find Videogame by Id");
  } catch (error) {

    throw error;
  }
};


module.exports = {
  findById,
  findByIdApi
}