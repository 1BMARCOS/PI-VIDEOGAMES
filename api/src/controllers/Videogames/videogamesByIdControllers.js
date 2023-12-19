const {Videogame, Genre} = require ('../../db')
const {getAllVideogames} = require ('./videogamesControllers')

const findById = async (id) => {
    const videogame = await Videogame.findByPk(id);
    return videogame;
  };
  
  const findByIdApi = async (id) => {
    try {
      const videogames = await getAllVideogames ();
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