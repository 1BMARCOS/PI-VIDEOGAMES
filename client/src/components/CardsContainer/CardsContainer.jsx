import Card from "../Card/Card";
import styles from "../CardsContainer/CardsContainer.module.css"

function CardsContainer({ allVideogames }) {
// console.log(allVideogames);
    return (
        <div className={styles.CardsContainer}>
            {allVideogames?.map(videogames => {
                return (
                <Card key={videogames.id} videogames={videogames} />
            )}
            )}

        </div>
    )


}

export default CardsContainer;