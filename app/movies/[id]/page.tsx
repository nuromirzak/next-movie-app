import React from "react";
import {IPageProps} from "@/app/types";
import {movieService} from "@/app/services/movieService";
import {DetailedMoviePage} from "@/app/components/DetailedMoviePage";
import {Metadata} from "next";

export async function generateMetadata(
    props: IPageProps
): Promise<Metadata> {
    const id = props.params.id;

    if (!id) {
        return {
            title: "Invalid Movie ID",
        };
    }

    const movie = await movieService.getMovieById(id);

    if (!movie) {
        return {
            title: "Error Fetching Movie",
        };
    }

    return {
        title: movie.name || movie.alternativeName || "Unknown Movie",
        description: movie.description || "No description available",
    };
}

export default async function Home(props: IPageProps) {
    const id = props.params.id;

    if (!id) {
        return <h1>Invalid movie ID</h1>;
    }

    const movie = await movieService.getMovieById(id);

    if (!movie) {
        return <h1>Error fetching movie</h1>;
    }

    return (
        <React.Fragment>
            <DetailedMoviePage movie={movie}/>
        </React.Fragment>
    );
}
