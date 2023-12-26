import {
    GET_VIDEOGAME_BY_NAME,
    GET_VIDEOGAMES,
    // GET_DETAIL,
  } from "../actions/actions";
  
  const initialState = {
    videogames: [], 
    allVideogames: [], 
    allGenres: [], 
    genres: [], 
    detail: [],
    allVideogamesCopy: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_VIDEOGAMES:
        return {
          ...state,
          videogames: action.payload,
          allVideogames: action.payload,
          copyAllVideogames: action.payload,
        };
      case GET_VIDEOGAME_BY_NAME:
        return {
          ...state,
          allVideogames: action.payload,
        };
      default:
        return state; 
    }
  }
  
  export default rootReducer;
  
  
  //en el reducer consume las actions y lo unico que se hace es aceptar dos cosas: state y action las acepta y devuelve una nueva instancia del estado actualizado
  
  //el reducer NO CAMBIA NINGUNA PARTE DEL ESTADO, produce una nueva INSTANCIA (ACTUALIZA)
  
  //                        ^     ===========> ACTION
  //                        |       dispatch     |
  //                        |                    |
  //                        |                    v
  //                      VIEW/UI             REDUCERS
  //                        |                    |
  //                        |                    |
  //                        |     subscribe      V
  //                        |     <==========   STORE
  //
  //