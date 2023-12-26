import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import React from "react";
// import { useDispatch } from "react-redux";
// import { getDetail } from "../../redux/actions/actions";

const Card = ({ videogames }) => {
  console.log(videogames);
  const {
    id,
    name,
    image,
    genres
  } = videogames

  return (
    <div>
      <div className={styles.cardContainer}>
        <p className={styles.cardName}>{name}</p>
        <p>{genres.join(", ")}</p>
        <img className={styles.cardImg} src={image} alt={name} />
        <Link to={`/home/${id}`}>
          <p className={styles.detailsTx} >DETAILS</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;



