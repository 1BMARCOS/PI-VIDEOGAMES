// Detail.js

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearMyStore } from "../../redux/actions/actions";
import styles from "./Detail.module.css";
import gameImage from "../../assets/loading.jpg"
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const [gameDetail, setGameDetail] = useState({});

  useEffect(() => {
    const detailData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
        console.log(response.data);
        setGameDetail(response.data);
      } catch (error) {
        window.alert("No se encontró el juego");
      }
    };

    detailData();

    return () => setGameDetail({});
  }, [id]);

  return (
    <div className={styles.bodyDetail}>
      <div className={styles.nav}>
        <Link to="/home">
          <button className={styles.button} onClick={clearMyStore}>
            BACK
          </button>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.Card}>
          {gameDetail && Object.keys(gameDetail).length > 0 ? (
            <div>
              <p className={styles.id}>ID: {gameDetail.id}</p>
              <p className={styles.name}>{gameDetail.name}</p>
              <img
                className={styles.img}
                src={gameDetail.image || gameImage}
                alt="IMAGE NOT FOUND"
              />

              <p className={styles.platforms}>
                Plataformas: {gameDetail.platforms}
              </p>
              <p className={styles.description}>{gameDetail.description}</p>
              <p className={styles.releaseDate}>
                Fecha de lanzamiento: {gameDetail.released}
              </p>
              <p className={styles.rating}>Rating: {gameDetail.rating}</p>
              <p className={styles.genres}>
                Géneros: {gameDetail.genres.join(", ")}
              </p>
            </div>
          ) : (
            <div className={styles.nav}>
              <img
                src={gameImage}
                className={styles.loadingGame}
                alt="Loading..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
