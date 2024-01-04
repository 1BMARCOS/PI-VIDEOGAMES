import {
  FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,
  GET_VIDEOGAME_BY_NAME,
  GET_VIDEOGAMES,
  GET_GENRES,
  ORDER_VIDEOGAMES,
} from "../actions/actions";

const initialState = {
  videogames: [],
  allVideogames: [],
  allGenres: [],
  copyAllVideogames: [],
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
    case GET_GENRES:
      return {
        ...state,
        allGenres: [...action.payload],
      };
    case GET_VIDEOGAME_BY_NAME:
      return {
        ...state,
        allVideogames: action.payload,
      };
    case FILTER_BY_GENRE:
      if (action.payload === "all") {
      return {
        ...state,
        allVideogames: [...state.copyAllVideogames],
      };
    }
    const allVideogamesGenre = state.videogames.filter((e) =>{
      
      return e.genres.includes(action.payload)
        });
  return {
    ...state,
    allVideogames: [...allVideogamesGenre],
};
    case FILTER_BY_ORIGIN:
    if (action.payload === "all") {
      return {
        ...state,
        allVideogames: [...state.copyAllVideogames],
      };
    }
      let originFiltered;
      if (action.payload === "api") {
        originFiltered = state.copyAllVideogames.filter((e) => typeof e.id === "number");
      } else if (action.payload === "db") {
        originFiltered = state.copyAllVideogames.filter((e) => typeof e.id === "string");       
      } 
      return {
        ...state,
        allVideogames: [...originFiltered],
        selectedOrigin: action.payload,
      };
    case ORDER_VIDEOGAMES:
      
      if (action.payload === "all")
        return { ...state, allVideogames: [...state.copyAllVideogames] };

      const gamesOrder = [...state.copyAllVideogames];
    
      const videogameOrderResult =
        action.payload === "A-Z"
          ? gamesOrder.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : action.payload === "Z-A"
          ? gamesOrder.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
          : action.payload === "rating"
          ? gamesOrder.sort(function (a, b) {
              return b.rating - a.rating;
            })
          : gamesOrder.sort(function (a, b) {
            // UNA CONDICIONAL ACÁ PARA SEPARAR RATINGS DE DB - API
              return a.rating - b.rating;
            });
    
      
      return {
        ...state,
        allVideogames: [...videogameOrderResult],
      };
    default:
      return state;
  }
}

export default rootReducer;