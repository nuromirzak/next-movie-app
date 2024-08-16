import React from "react";
import {IPageProps} from "@/app/types";
import {movieService} from "@/app/services/movieService";
import {DetailedMoviePage} from "@/app/components/DetailedMoviePage";

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
