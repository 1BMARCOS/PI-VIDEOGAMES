import React from "react";
import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";

function CardsContainer({ allVideogames, currentPage }) {
  const pokemonPerPage = 15;
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = allVideogames.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  return (
    <div className={styles.CardsContainer}>
      {currentPokemon?.map((videogames) => (
        <Card key={videogames.id} videogames={videogames} />
      ))}
    </div>
  );
}

export default CardsContainer;