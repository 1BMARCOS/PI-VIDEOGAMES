const {getAllVideogames, getVideogameByName }= require('../../controllers/Videogames/videogamesControllers')


const getVideogamesHandler = async (req, res) => {
    const { name } = req.query;
    try {

        if (name) {
            const videogameByName = await getVideogameByName(name)
            res.status(200).json(videogameByName);
        } else {
            const response = await getAllVideogames();
            res.status(200).json(response)
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {getVideogamesHandler}