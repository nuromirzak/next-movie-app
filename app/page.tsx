import {IPageProps} from "@/app/types";
import {movieService} from "@/app/services/movieService";
import React from "react";
import {MovieGrid} from "@/app/components/MovieGrid";
import {Pagination} from "@/app/components/Pagination";
import {Metadata} from "next";

export async function generateMetadata(
    props: IPageProps
): Promise<Metadata> {
    const type = props.searchParams.type ? String(props.searchParams.type) : undefined;
    const query = props.searchParams.query ? String(props.searchParams.query) : undefined;

    let title = "Popular Movies";
    if (query) {
        title = `Search results for "${query}"`;
    } else if (type) {
        title = `${type} Movies`;
    }

    return {
        title: title,
        description: "Browse our collection of popular movies",
    };
}

export default async function Home(props: IPageProps) {
    const page = props.searchParams.page ? String(props.searchParams.page) : "1";
    const perPage = 20;
    const type = props.searchParams.type ? String(props.searchParams.type) : undefined;
    const query = props.searchParams.query ? String(props.searchParams.query) : undefined;

    const movies = query
        ? await movieService.searchMovies(page, perPage, query)
        : await movieService.fetchMovies(page, perPage, type);

    if (!movies) {
        return <h1>Error fetching movies</h1>;
    }

    return (
        <React.Fragment>
            <h1 className={`header`}>Popular Movies</h1>
            <MovieGrid movies={movies.docs}/>
            <Pagination totalPages={movies.pages} currentPage={movies.page}/>
        </React.Fragment>
    );
}
