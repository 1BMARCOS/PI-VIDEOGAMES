require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const URL = 'https://api.rawg.io/api/games';
const genreURL = "https://api.rawg.io/api/genres"
const { Videogame, Genre } = require('../../db');


const infoCleaner = (array) => {
  return array.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.background_image ? game.background_image : "Image not found",
      platforms: game.platforms?.map((platform) => platform.platform.name).join(", "),
      released: game.released,
      rating: game.rating,
      genres: game.genres?.map((genre) => genre.name) || [],
      created: false,
    };
  });
};
const getAllVideogames = async () => {
  const only100 = 100; 
  let allGames = [];

  
  for (let page = 1; allGames.length < only100; page++) {
    const videogamesAPI = (
      await axios.get(`${URL}?key=${API_KEY}&page=${page}`)
    ).data;

    const gamesApi = infoCleaner(videogamesAPI.results);
    allGames = [...allGames, ...gamesApi];
  }

  
  allGames = allGames.slice(0, only100);

  const videogamesDB = await Videogame.findAll({
    include: Genre,
  });

  if (videogamesDB) {
    const dbGames = videogamesDB.map((game) => {
      const dbGenre = game.genres.map((genre) => {
        return genre.name;
      });
      const db = {
        id: game.id,
        name: game.name,
        description: game.description,
        image: game.image,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        genres: dbGenre,
      };
      return db;
    });

    return [...dbGames, ...allGames];
  }
};

const getVideogameByName = async (name) => {
  const videogamesAPI = (await axios.get(`${URL}?key=${API_KEY}`)
  ).data;

  const gameNameApi = infoCleaner(videogamesAPI.results)

  const gameFiltered = gameNameApi.filter(game => game.name === name)

  const gameDB = await Videogame.findAll({ where: { name: name } })

  return [...gameFiltered, ...gameDB]

}





module.exports = { getAllVideogames, getVideogameByName }
