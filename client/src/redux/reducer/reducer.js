import {
    GET_VIDEOGAME_BY_NAME,
  } from "../actions/actions";
  
  const initialState = {
    videogames: [], // pokemons
    allVideogames: [], // allPokemons
    allGenres: [], // allTypes
    genres: [], // types
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_VIDEOGAME_BY_NAME:
        if (!action.payload.length) {
          alert("Videogame Not found");
          return state; 
        }
        return {
          ...state,
          videogames: action.payload,
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