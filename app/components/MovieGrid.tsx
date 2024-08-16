import {MovieCard} from "./MovieCard";
import styles from "./MovieGrid.module.css";
import {Movie} from "@/app/types";

interface MovieGridProps {
    movies: Movie[];
}

export const MovieGrid = ({movies}: MovieGridProps) => {
    return (
        <div className={styles.grid}>
            {movies.map((movie) => {
                return (
                    <MovieCard key={movie.id} movie={movie}/>
                );
            })}
        </div>
    );
};
