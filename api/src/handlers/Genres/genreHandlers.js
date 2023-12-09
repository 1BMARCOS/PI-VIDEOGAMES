const { getGenresApi } = require("../../controllers/Genres/genreControllers");

const findAllGenresHandler = async (req, res) => {
  try {
    const type = await getGenresApi();
    res.status(201).json(type);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {findAllGenresHandler};