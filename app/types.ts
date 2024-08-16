import {z} from "zod";

const MovieType = z.enum(["movie", "tv-series", "cartoon", "anime", "animated-series", "tv-show"]);

const RatingSchema = z.object({
    kp: z.number().nullish(),
    imdb: z.number().nullish(),
    tmdb: z.number().optional(),
    filmCritics: z.number().nullish(),
    russianFilmCritics: z.number().nullish(),
    await: z.number().nullish(),
});

const PosterSchema = z.object({
    url: z.string().nullish(),
    previewUrl: z.string().nullish(),
});

const GenreSchema = z.object({
    name: z.string(),
});

const CountrySchema = z.object({
    name: z.string(),
});

const PersonSchema = z.object({
    id: z.number().nullish(),
    photo: z.string().nullish(),
    name: z.string().nullish(),
    enName: z.string().nullish(),
    description: z.string().nullish(),
    profession: z.string().nullish(),
    enProfession: z.string().nullish(),
});

const BudgetSchema = z.object({
    value: z.number().nullish(),
    currency: z.string().nullish(),
});

const FactSchema = z.object({
    value: z.string(),
    type: z.string(),
    spoiler: z.boolean(),
});

export const MovieSchema = z.object({
    id: z.number(),
    name: z.string().nullish(),
    alternativeName: z.string().nullish(),
    type: MovieType,
    year: z.number().nullish(),
    description: z.string().nullish(),
    rating: RatingSchema,
    movieLength: z.number().nullish(),
    poster: PosterSchema.nullish(),
    genres: z.array(GenreSchema),
    countries: z.array(CountrySchema).nullish(),
    persons: z.array(PersonSchema).nullish(),
    facts: z.array(FactSchema).nullish(),
});

export const MovieListSchema = z.object({
    docs: z.array(MovieSchema),
    total: z.number(),
    limit: z.number(),
    page: z.number(),
    pages: z.number(),
});

export type Movie = z.infer<typeof MovieSchema>;
export type MovieList = z.infer<typeof MovieListSchema>;

// https://stackoverflow.com/a/76069631
export interface IPageProps {
    params: Record<string, string | undefined>
    searchParams: Record<string, string[] | string | undefined>
}
