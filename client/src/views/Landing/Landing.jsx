import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  const location = useLocation();

  // Verificar si la ruta actual es "/home"
  const isHomeRoute = location.pathname === "/home";

  return (
    <div className={styles.body}>
      {!isHomeRoute && (
        <div className={styles.Landing}>
          <Link to="/home">
            <button className={styles.button}>Ingresar</button>
          </Link>
        </div>
      )}
    </div>
  );
}
