import {Movie, MovieList, MovieListSchema, MovieSchema} from "@/app/types";
import {z} from "zod";

interface IMovieService {
    fetchMovies(page: string, perPage: number, type: string | undefined): Promise<MovieList | null>;

    searchMovies(page: string, perPage: number, query: string): Promise<MovieList | null>;

    getMovieById(id: string): Promise<Movie | null>;
}

class MovieService implements IMovieService {
    private static instance: MovieService;
    private readonly apiKey: string;

    private constructor() {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error("API Key not found");
        }
        this.apiKey = apiKey;
    }

    public static getInstance(): MovieService {
        if (!MovieService.instance) {
            MovieService.instance = new MovieService();
        }
        return MovieService.instance;
    }

    private async fetchFromAPI<T>(url: URL, schema: z.ZodType<T>, cache: RequestCache = "force-cache"): Promise<T | null> {
        try {
            const response = await fetch(url.toString(), {
                headers: {
                    "X-API-KEY": this.apiKey,
                },
                cache: cache,
            });

            if (!response.ok) {
                const errorBody = await response.text();
                const status = response.status;
                const statusText = response.statusText;
                console.error("API request failed", {
                    status: status,
                    statusText: statusText,
                    body: errorBody,
                });
                throw new Error("API request failed");
            }

            const rawData = await response.json();
            return schema.parse(rawData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error("Validation errors:", error.errors[0]);
            } else {
                console.error(error);
            }
            return null;
        }
    }

    public async fetchMovies(
        page: string,
        perPage: number,
        type: string | undefined,
    ): Promise<MovieList | null> {
        const url = new URL("https://api.kinopoisk.dev/v1.4/movie");
        url.searchParams.set("notNullFields", "poster.url");
        url.searchParams.set("page", page.toString());
        url.searchParams.set("limit", perPage.toString());

        if (type) {
            url.searchParams.set("type", type);
        }
        return await this.fetchFromAPI(url, MovieListSchema);
    }

    public async searchMovies(page: string, perPage: number, query: string): Promise<MovieList | null> {
        const url = new URL("https://api.kinopoisk.dev/v1.4/movie/search");
        url.searchParams.set("page", page.toString());
        url.searchParams.set("limit", perPage.toString());
        url.searchParams.set("query", query);

        return this.fetchFromAPI(url, MovieListSchema);
    }

    public async getMovieById(id: string): Promise<Movie | null> {
        const cache : RequestCache = id === "random" ? "no-store" : "force-cache";
        const url = new URL(`https://api.kinopoisk.dev/v1.4/movie/${id}`);

        return await this.fetchFromAPI(url, MovieSchema, cache);
    }
}

export type {IMovieService};
export const movieService = MovieService.getInstance();
