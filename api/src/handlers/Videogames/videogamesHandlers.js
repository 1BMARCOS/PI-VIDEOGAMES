const getVideogamesController = require ('../../controllers/Videogames/videogamesControllers')


const getVideogamesHandler = async (req,res) =>{
    try {
        const response = await getVideogamesController()

     if(!response){
        throw new Error ('Can not find any videogame')
     }
     
     return res.status(200).json(response)

    } catch (error) {
        if(error.message === 'Can not find any videogame')
       return res.status(404).send({error: error.message})
    }

return res.status(500).send('Server error')
}

module.exports = getVideogamesHandler