import axios from "axios";
export const CLEAR = "CLEAR";
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const GET_GENRES = "GET_GENRES";
export const ORDER_VIDEOGAMES = "ORDER_VIDEOGAMES";


export const getVideogames = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/videogames");
      const videogames = response.data;
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: videogames,
      });
    }
    catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };
};

export function getVideogamesByName(name) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`http://localhost:3001/videogames/?name=${name}`);
      return dispatch({
        type: GET_VIDEOGAME_BY_NAME,
        payload: response.data,
      });
    }
    catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
};
export function getGenres () {

  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/genres`)
      
      return dispatch({
        type: GET_GENRES,
        payload: response.data,
      })
    } catch (error) {
      console.log("No se pudieron traer los generos");
    }
  }
};
export function filterByGenre (genre){
  return {
  type: FILTER_BY_GENRE,
  payload: genre,
  };
};
export const filterByOrigin = (origin) => ({
  type: FILTER_BY_ORIGIN,
  payload: origin,
});
export const orderVideogames = (payload) =>{
  return {
    type: ORDER_VIDEOGAMES,
    payload: payload,
  };
}
export function clearMyStore() {
  return {
    type: CLEAR,
  };
}

