import { sdk } from '~/libs/client';
import { json } from "@remix-run/node";
import { getBackdropUrl } from '~/utils';
import { useLoaderData } from "@remix-run/react";

type ParamProps = {
    params: { imdbId: string };
};
 
export async function loader({ params }: ParamProps) {
    const backDropUrl = await getBackdropUrl(params.imdbId);
    const { searchMovieById } = await sdk.SearchMovieById({
        searchMovieByIdId: params.imdbId
    });

    return json({
        searchMovieById,
        backDropUrl
    });
}
 
export default function Movie() {
    const {
        searchMovieById: movie,
        backDropUrl
    } = useLoaderData<typeof loader>();

    styles.wrapper.backgroundImage = `url(${backDropUrl})`;

    if (!movie)
        return <div>Movie not found</div>

    return (
        <div style={styles.wrapper}>
            <img
                src={movie.Poster || "https://via.placeholder.com/300x450"}
                alt={movie.Title || "Movie Poster"}
                width={300}
                height={450}
            />
            <div style={styles.details}>
                <h1>{movie.Title}</h1>
                <p>{movie.Plot}</p>
                <p>Starring: {movie.Actors}</p>
                <p>⭐️ {JSON.stringify(movie.Ratings)}</p>
                <p>{movie.Year}</p>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        backgroundImage: "url('https://image.tmdb.org/t/p/original/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "calc(100vh - 52px)",
        width: "100vw",
        display: "flex",
        gap: "2rem",
        padding: "4rem",
    },

    details: {
        display: "flex",
        flexDirection: "column" as "column",
        gap: "1rem",
        color: "white",
    }
}
