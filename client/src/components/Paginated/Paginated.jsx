import React from "react";
import styles from "./Paginated.module.css";

export default function Paginated({
  pokemonPerPage: videogamesPerPage,
  videogames,
  currentPage,
  pagination,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(videogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleBack = (e) => {
    e.preventDefault();
    pagination(currentPage - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    pagination(currentPage + 1);
  };

  return (
    <div>
      <ul className={styles.pagination}>
        <li>
          <button
            className={styles.paginationButton}
            onClick={handleBack}
            disabled={currentPage === pageNumbers[0]}
          >
            Back
          </button>
        </li>
        {pageNumbers &&
          pageNumbers?.map((number) => {
            return (
              <li key={number}>
                <button
                  className={`${styles.paginationButton} ${
                    currentPage === number ? styles.active : ""
                  }`}
                  onClick={() => pagination(number)}
                >
                  {number}
                </button>
              </li>
            );
          })}
        <li>
          <button
            className={styles.paginationButton}
            onClick={handleNext}
            disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
