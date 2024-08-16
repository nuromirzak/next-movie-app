import styles from "./DetailedMoviePage.module.css";
import {Movie} from "@/app/types";
import Image from "next/image";

interface DetailedMoviePageProps {
    movie: Movie;
}

export const DetailedMoviePage = ({movie}: DetailedMoviePageProps) => {
    const posterUrl = movie.poster?.url || "https://via.placeholder.com/300x450.png?text=No+poster";

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Image src={posterUrl} alt={`${movie.name} poster`} width={300} height={450} className={styles.poster}/>
                <div className={styles.headerInfo}>
                    <h1 className={`${styles.title} header`}>{movie.name}</h1>
                    {movie.alternativeName && <h2 className={styles.altTitle}>{movie.alternativeName}</h2>}
                    <div className={styles.meta}>
                        <span>{movie.year}</span>
                        <span>{movie.type}</span>
                        {movie.movieLength && <span>{movie.movieLength} min</span>}
                    </div>
                    <div className={styles.ratings}>
                        {Boolean(movie.rating.imdb) &&
                            <span className={styles.rating}>IMDb: ⭐ {movie.rating.imdb}</span>}
                        {Boolean(movie.rating.kp) &&
                            <span className={styles.rating}>Kinopoisk: 🍿 {movie.rating.kp}</span>}
                        {Boolean(movie.rating.tmdb) &&
                            <span className={styles.rating}>TMDB: 🎬 {movie.rating.tmdb}</span>}
                    </div>
                </div>
            </div>

            <div className={styles.details}>
                {movie.description && (
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Description</h3>
                        <p>{movie.description}</p>
                    </section>
                )}

                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Genres</h3>
                    <ul className={styles.list}>
                        {movie.genres.map((genre, index) => {
                            return (
                                <li key={index} className={styles.listItem}>{genre.name}</li>
                            );
                        })}
                    </ul>
                </section>

                {movie.countries && movie.countries.length > 0 && (
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Countries</h3>
                        <ul className={styles.list}>
                            {movie.countries.map((country, index) => {
                                return (
                                    <li key={index} className={styles.listItem}>{country.name}</li>
                                );
                            })}
                        </ul>
                    </section>
                )}

                {movie.persons && movie.persons.length > 0 && (
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Cast & Crew</h3>
                        <div className={styles.persons}>
                            {movie.persons.map((person, index) => {
                                if (!person.name || !person.photo || !person.profession) {
                                    return null;
                                }
                                return (
                                    <div key={index} className={styles.person}>
                                        <Image src={person.photo} alt={person.name} width={100} height={100}/>
                                        <p className={styles.personName}>{person.name}</p>
                                        <p className={styles.personRole}>{person.profession}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {movie.facts && movie.facts.length > 0 && (
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Interesting Facts</h3>
                        <ul className={styles.factsList}>
                            {movie.facts.map((fact, index) => {
                                return (
                                    <li key={index}
                                        className={`${styles.factItem} ${fact.spoiler ? styles.spoiler : ""}`}>
                                        {fact.value}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};
