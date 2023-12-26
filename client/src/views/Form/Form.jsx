import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";


const Form = () => {
    const [input, setInput] = useState({
        name: "",
        image: "",
        description: "",
        platforms: "",
        released: "",
        rating: "",
        genres: [],
    });

    const [error, setError] = useState({
        name: "",
        image: "",
        description: "",
        platforms: "",
        released: "",
        rating: "",
        genres: [],
    });

    const [allGenres, setAllGenres] = useState([]);
    

    useEffect(() => {
        axios.get("http://localhost:3001/genres")
            .then((response) => setAllGenres(response.data))
            .catch((error) => console.error("Error al obtener los géneros:", error));
    }, []);
    const validate = (fieldName, value) => {
        switch (fieldName) {
            case "name":
                if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(value)) {
                    setError({ ...error, name: "Nombre inválido. Solo letras y espacios son permitidos." });
                } else {
                    setError({ ...error, name: "" });
                }
                break;
            case "image":
                if (!value.match(/\.(jpeg|jpg|gif|png)$/)) {
                    setError({ ...error, image: "Formato de imagen inválido. Utilice jpeg, jpg, gif o png." });
                } else {
                    setError({ ...error, image: "" });
                }
                break;
            case "description":
                if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s\d]+$/.test(value)) {
                    setError({ ...error, description: "Descripción inválida! No puede contener caracteres especiales." });
                  } else if (value.length > 50) {
                    setError({ ...error, description: "50 caracteres maximo." });
                  } else {
                    setError({ ...error, description: "" });
                  }
                  break;
            case "platforms":

                break;
            case "released":
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                    setError({ ...error, released: "Formato de fecha inválido. Utilice el formato YYYY-MM-DD." });
                  } else {
                    setError({ ...error, released: "" });
                  }
                  break;
                
            case "rating":
                if (isNaN(value) || value < 0 || value > 5) {
                    setError({ ...error, rating: "Rating inválido. Debe ser un puntaje entre 0 y 5." });
                } else {
                    setError({ ...error, rating: "" });
                }
                break;
            case "genres":
                if (value.length === 0) {
                    setError({ ...error, genres: "Debe seleccionar al menos un género." });
                } else {
                    setError({ ...error, genres: "" });
                }
                break;
            default:
                break;
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type==="checkbox") {
            
            const updatedGenres = checked
                ? [...input.genres, value]
                : input.genres.filter((genre) => genre !== value);

            setInput({ ...input, genres: updatedGenres });
        } else {

            setInput({ ...input, [name]: value });
        }

        validate(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (0 === 0) {
            try {
                const response = await axios.post("http://localhost:3001/videogames", {input});
                console.log("Respuesta del servidor:", response.data);
            } catch (error) {
                console.error("Error al enviar el formulario:", error.message);
                
            }
        } else {
            console.log("Formulario contiene errores. No se enviará.");
        }
    };
    return (
        <div className={styles.formDiv}>
            <div className={styles.formNav}>
                <Link to="/home">
                    <button className={styles.formButton}>
                        BACK
                    </button>
                </Link>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label className={styles.formLabel}>
                        Name
                        <input
                            name="name"
                            value={input.name}
                            onChange={handleChange}
                        />
                        <span className={styles.formError}>{error.name}</span>
                    </label>

                    <label className={styles.formLabel}>
                        Image
                        <input
                            name="image"
                            value={input.image}
                            onChange={handleChange}
                        />
                        <span className={styles.formError}>{error.image}</span>
                    </label>

                    <label className={styles.formLabel}>
                        Description
                        <input
                            name="description"
                            value={input.description}
                            onChange={handleChange}
                        />
                        <span className={styles.formError}>{error.description}</span>
                    </label >

                    <label className={styles.formLabel}>
                        Platforms
                        <input
                            name="platforms"
                            value={input.platforms}
                            onChange={handleChange}
                        />
                        <span className={styles.formError}>{error.platforms}</span>
                    </label>

                    <label className={styles.formLabel}>
                        Released
                        <input
                            name="released"
                            value={input.released}
                            onChange={handleChange}
                        />
                        <span className={styles.formError}>{error.released}</span>
                    </label>

                    <label className={styles.formLabel}>
                        Rating
                        <input
                            name="rating"
                            value={input.rating}
                            onChange={handleChange}
                        />
                        <span className={styles.formError}>{error.rating}</span>
                    </label>
                    <label className={styles.formLabel}>
                        Géneros
                        <div className={styles.genresDropdown}>                                                              
                                {allGenres?.map((genre) => 
                                    {return (
                                    <div key={genre.id}>
                                        <label htmlFor="">
                                            {genre.name}
                                        </label>
                                        <input type="checkbox" onChange={handleChange} value={genre.name}/>                                        

                                    </div>
                                    
                                    )}
                                )}                            
                        </div>
                    </label>
                    <span className={styles.error}>{error.genres}</span>
                    
                    <button type="submit" className={styles.formButton}>Crear videojuego</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
