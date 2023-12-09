const {Videogame, Genre} = require ('../../db')

const createVideogame = async (
    name,
    genre,
    description,
    platforms,
    image,
    released,
    rating,
    createdInDB,

) => {
    const videogameCreate = await Videogame.create({
    name,
    description,
    platforms,
    image,
    released,
    rating,
    createdInDB,
    });

    const genreDb = await Genre.findAll({ where: { name: genre } });

    videogameCreate.addGenre(genreDb);

    return videogameCreate;
};


module.exports = createVideogame;