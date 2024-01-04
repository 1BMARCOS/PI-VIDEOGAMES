import styles from '../SearchBar/SearchBar.module.css'

function SearchBar({ handleChange, handleSubmit }) {
  return (
    <div className={styles.SearchBar}>
      <form className={styles.form} onChange={handleChange}>
        <input className={styles.input} placeholder='Buscar' type='search' />
        <button className={styles.button} type='submit' onClick={handleSubmit}>Buscar</button>
      </form>
    </div>
  )
}
export default SearchBar;