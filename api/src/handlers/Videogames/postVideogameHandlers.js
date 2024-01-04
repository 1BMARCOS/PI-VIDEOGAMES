const {createVideogameDB} = require ('../../controllers/Videogames/postVideogameControllers')
const createVideogameHandler = async (req, res)=>{
  const {input} = req.body
  console.log(input);
  const {
    name,
    description,
    image,
    released,
    rating,
    platforms,
    genres}
   = input

  try {
    const response = await createVideogameDB(
      name,
      description,
      image,
      released,
      rating,
      platforms,
      genres
    )
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

module.exports = {createVideogameHandler}