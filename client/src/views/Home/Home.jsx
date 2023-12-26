import React, { useState } from "react";
import styles from "./Home.module.css";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import {getVideogames, getVideogamesByName } from "../../redux/actions/actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Home() {

const dispatch = useDispatch()
const allVideogames = useSelector((state)=>state.allVideogames);
const [searchString, setSearchString] = useState ("");

function handleChange (e){
  e.preventDefault ()
  setSearchString (e.target.value)
}

function handleSubmit (e){
  e.preventDefault()
dispatch (getVideogamesByName(searchString))
}
useEffect (() => {
  dispatch(getVideogames())

},[dispatch])

  return (
    <div className={styles.home}>
      <div className={styles.nav}>
        <Link to="/form">
          <button className={styles.button}>
            CREAR VIDEOJUEGO
          </button>
        </Link>
      </div>
      <div className={styles.components}>
        <SearchBar handleChange={handleChange} handleSubmit={handleSubmit}  /> 
        <CardsContainer allVideogames = {allVideogames}/>
      </div>
    </div>
  );
}
