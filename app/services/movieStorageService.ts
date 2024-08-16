import {Movie} from "@/app/types";

interface MovieStorageServiceInterface {
    getMovie(id: number): Movie | null;

    setMovie(movie: Movie): void;
}

// I don't use it in the code, because I don't need it anymore, but I'll leave it here for reference
const movieStorageService: MovieStorageServiceInterface = (() => {
    const storageKey = "movies";
    const lruKey = "movies_lru";
    const maxItems = 100;

    if (typeof window !== "undefined") {
        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, JSON.stringify({}));
            localStorage.setItem(lruKey, JSON.stringify([]));
        }
    }

    function getMovies(): Record<string, Movie> {
        const moviesJson = localStorage.getItem(storageKey);
        return moviesJson ? JSON.parse(moviesJson) : {};
    }

    function setMovies(movies: Record<string, Movie>): void {
        localStorage.setItem(storageKey, JSON.stringify(movies));
    }

    function getLRU(): number[] {
        const lruJson = localStorage.getItem(lruKey);
        return lruJson ? JSON.parse(lruJson) : [];
    }

    function setLRU(lru: number[]): void {
        localStorage.setItem(lruKey, JSON.stringify(lru));
    }

    function updateLRU(id: number): void {
        let lru = getLRU();
        lru = lru.filter((item) => {
            return item !== id;
        });
        lru.push(id);
        if (lru.length > maxItems) {
            const removedId = lru.shift();
            if (removedId) {
                const movies = getMovies();
                delete movies[removedId];
                setMovies(movies);
            }
        }
        setLRU(lru);
    }

    return {
        getMovie(id: number): Movie | null {
            const movies = getMovies();
            const movie = movies[id];
            if (movie) {
                updateLRU(id);
            }
            return movie || null;
        },

        setMovie(movie: Movie): void {
            const movies = getMovies();
            movies[movie.id] = movie;
            setMovies(movies);
            updateLRU(movie.id);
        },
    };
})();
