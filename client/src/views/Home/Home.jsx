import React, { useState } from "react";
import styles from "./Home.module.css";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import Paginated from "../../components/Paginated/Paginated";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getVideogamesByName, filterByGenre, getGenres, filterByOrigin, orderVideogames } from "../../redux/actions/actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Home() {

  const dispatch = useDispatch()
  const allVideogames = useSelector((state) => state.allVideogames);
  const allGenres = useSelector((state) => state.allGenres);
  const videogames = useSelector((state) => state.videogames)
  


  const [searchString, setSearchString] = useState("");
  const [order, setOrder] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);

  function handleChange(e) {
    e.preventDefault()
    setSearchString(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getVideogamesByName(searchString))
  }

  useEffect(() => {
    dispatch(getVideogames())
    dispatch(getGenres())
  }, [dispatch])
  useEffect(() => {
    setCurrentPage(1);
  }, [videogames]);

  const filterGenre = (e) => {
    const selectedGenre = e.target.value;
    dispatch(filterByGenre(selectedGenre));
  };

  const filterOrigin = (e) => {
    const selectedOrigin = e.target.value;
    dispatch(filterByOrigin(selectedOrigin));
  };
  const handleOrder = (e) => {
    e.preventDefault();
    const { value } = e.target;
    dispatch(orderVideogames(value));
    setOrder(value);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.home}>
      <select onChange={(e) => handleOrder(e)} className={styles.button}>
          <option value="all">ORDENAR POR DEFECTO</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="rating">+ - Rating</option>
          <option value="lowrating">- + Rating</option>
        </select>
      <select onChange={filterOrigin} className={styles.button}>
        <option value="all">Todos los juegos</option>
        <option value="api">SOLO DE API</option>
        <option value="db">SOLO DE DATABASE</option>
      </select>
      <select onChange={filterGenre} className={styles.button}>
        <option value="all">Todos los generos</option>
        {allGenres.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>
      <div className={styles.nav}>
        <Link to="/form">
          <button className={styles.button}>
            CREAR VIDEOJUEGO
          </button>
        </Link>
      </div>
      <div className={styles.components}>

        <SearchBar 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        />
        <Paginated
            videogamesPerPage={15} 
            videogames={allVideogames?.length || 0} 
            currentPage={currentPage}
            pagination={handlePageChange}
          />
        <CardsContainer 
        allVideogames={allVideogames}
        currentPage={currentPage}
        />
      <div className={styles.paginatedBody}>
      </div>
      </div>
    </div>
  );
}
