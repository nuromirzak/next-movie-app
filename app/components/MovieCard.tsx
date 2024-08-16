import {Movie} from "@/app/types";
import styles from "./MovieCard.module.css";
import Image from "next/image";
import Link from "next/link";

export const MovieCard = ({movie}: { movie: Movie }) => {
    const title = movie.name || "No title";
    const altTitle = movie.alternativeName || "No alternative title";
    const posterUrl = movie.poster?.previewUrl || "https://via.placeholder.com/200x300?text=No+poster";
    const duration = movie.movieLength ? `${movie.movieLength} min` : "No duration";
    const year = movie.year ? movie.year.toString() : "No year";
    const imdbRating = movie.rating.imdb || "N/A";
    const kinopoiskRating = movie.rating.kp || "N/A";

    return (
        <Link href={`/movies/${movie.id}`}>
            <div className={styles.card}>
                <Image
                    src={posterUrl}
                    alt={`${title} poster`}
                    width={200}
                    height={300}
                    className={styles.poster}
                />
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.altTitle}>{altTitle}</p>
                    <div className={styles.info}>
                        <span>{year}</span>
                        <span>{duration}</span>
                    </div>
                    <div className={styles.rating}>
                        <div className={styles.ratingItem}>
                            <span>⭐ {imdbRating}</span>
                        </div>
                        <div className={styles.ratingItem}>
                            <span>🍿 {kinopoiskRating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
