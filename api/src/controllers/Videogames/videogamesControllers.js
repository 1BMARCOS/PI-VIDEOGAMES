require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const URL = 'https://api.rawg.io/api/games';
const genreURL = "https://api.rawg.io/api/genres"
const { Videogame, Genre } = require('../../db');
const DEFAULT_IMAGE = 'https://img.freepik.com/fotos-premium/primer-plano-controlador-videojuego-sobre-fondo-amarillo-ai-generativo_974546-23442.jpg'

const getVideogamesController = async () => {
  try {

    let i = 1;
    let games = [];
     
  
    while (i < 6) {
   
      const response = await axios.get(`${URL}?key=${API_KEY}&page=${i}`)
   
      const results = response.data.results;
      
    
      games.push(...results);

      i++;
    }
    


    const gamesFromApi =
      games.map((game) => ({
        id: game.id,
        image: game.background_image ? game.background_image : DEFAULT_IMAGE,
        name: game.name,
        rating: game.rating,
        genres: game.genres?.map((genre) => genre.name) || [],
        platforms: game.platforms?.map((platform) => platform.platform.name),

      }));


    const gamesFromDB = await Videogame.findAll({

      include: [{
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] }
      }]
    });

    const gamesFromDBFormatted = gamesFromDB.map((game) => ({
      id: game.id,
      image: game.image,
      name: game.name,
      rating: game.rating,
      platforms: game.platforms,
      genres: game.genres?.map((genre) => genre.name) || [],
      createdInDB: true
    }));

    const allVideogames = [...gamesFromDBFormatted, ...gamesFromApi];

    return allVideogames;
  }

  catch (error) {
    console.log(error.message);
    return [];
  }
};


// GENRES CONTROLLER

// getGenresApi = async () => {
//   const response = await axios.get(`${genreURL}?key=${API_KEY}`);
//   const genres = response.data.results;
//   const genreNames = [];
//   for (let genre of genres) {
//     let existingGenre = await Genre.findOne({ where: { name: genre.name } }); // lo que hago aca es buscar si ya tengo un type con tal nombre lo guardo en vez de crear otro para evitar pisar el id
//     if (existingGenre) {
//       genreNames.push(existingGenre);
//     } else {
//       const newGenre = await Genre.create({
//         name: genre.name,
//       });
//       genreNames.push(newGenre);
//     }
//   }
//   return genreNames;
// };

module.exports =  getVideogamesController
 

