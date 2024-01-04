
const { API_KEY } = process.env;
const axios = require('axios');
const genreURL = "https://api.rawg.io/api/genres"
const { Videogame, Genre } = require('../../db');

getGenresApi = async () => {
  const response = await axios.get(`${genreURL}?key=${API_KEY}`);
  const genres = response.data.results;
  const genreNames = [];
  for (let genre of genres) {
    let existingGenre = await Genre.findOne({ where: { name: genre.name } }); 
    if (existingGenre) {
      genreNames.push(existingGenre);
    } else {
      const newGenre = await Genre.create({
        name: genre.name,
      });
      genreNames.push(newGenre);
    }
  }
  return genreNames;
};


module.exports = {getGenresApi};