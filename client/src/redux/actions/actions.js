import axios from "axios";
export const CLEAR = "CLEAR";
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
// export const GET_DETAIL = "GET_DETAIL";


export const getVideogames = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/videogames");
    const videogames = response.data;
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: videogames,
    });
  };
};

export function getVideogamesByName(name) {
  return async function (dispatch) {
      let response = await axios.get(`http://localhost:3001/videogames/?name=${name}`);
      return dispatch({
        type: GET_VIDEOGAME_BY_NAME,
        payload: response.data,
      });
  };
}
  // export const getDetail = (id) => {
  //   return async (dispatch) => {
  //     try {
  //       const apiInfo = await axios.get(`http://localhost:3001/videogames/${id}`);
        
        
  //       const videogameDetails = apiInfo.data;
     
  //       return dispatch({

  //         type: GET_DETAIL,
  //         payload: videogameDetails,
  //       });

  //     } catch (error) {
  //       console.log(error.message);
  //       throw new Error(error.message);    
  //     }
  //   };
  // };

export function clearMyStore() {
  return {
    type: CLEAR,
  };
}

// CAMBIOS EN EL ESTADO