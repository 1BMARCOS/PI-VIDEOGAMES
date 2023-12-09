require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const URL = 'https://api.rawg.io/api/games';
const { Op } = require('sequelize'); //se utiliza para realizar operaciones de consulta avanzadas en la base de datos.
const {Videogame,Genre} = require ('../../db')
const DEFAULT_IMAGE = 'https://img.freepik.com/fotos-premium/primer-plano-controlador-videojuego-sobre-fondo-amarillo-ai-generativo_974546-23442.jpg'



const getVideogameByName = async (name) =>{

  name = name.toLowerCase();
   try {

  //DB
  const gamesDB = await Videogame.findAll({

    where: {
      name: {
        [Op.iLike]: name.toLowerCase(),
      },
    },

    limit: 15,
 
    include: {
      model: Genre,
      attributes: ['name', 'id'],
      through: { attributes: [] },
    },
  });


  if (gamesDB.length) {
    return gamesDB;
  }
  
  //API
  const response = await axios.get(`${URL}?search=${name}&key=${API_KEY}`);
  const apiData = response.data
 
  if (apiData.results && apiData.results.length > 0) {
    const first15Games = apiData.results.slice(0, 15).map((game) => ({
      id: game.id,
      image: game.background_image?game.background_image: DEFAULT_IMAGE,
      name: game.name,
      rating: game.rating,
      released: game.released,
      description: game.description_raw,
      genres: game.genres?.map((genre) => genre.name) || [],
      platforms: game.platforms?.map((platform) => platform.platform.name) || [],
    }));
    
  
  return first15Games;
  }


   } catch (error) {
    return null

   }




}

module.exports = getVideogameByName
