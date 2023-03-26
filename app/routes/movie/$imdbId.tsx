import { sdk } from '~/libs/client';
import { json } from "@remix-run/node";
import { getBackdropUrl } from '~/utils';
import { useLoaderData } from "@remix-run/react";

let styles = {
    wrapper: {
        backgroundImage: "url('https://image.tmdb.org/t/p/original/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "calc(100vh - 120px)",
        width: "calc(100vw - 130px)",
        display: "flex",
        gap: "2rem",
        padding: "4rem"
    },
    details: {
        display: "flex",
        flexDirection: "column" as "column",
        gap: "1rem",
        color: "white"
    },
    errorBoundary: {
        backgroundColor: "#F3F3F3",
        borderRadius: "5px",
        boxShadow: "0px 0px 5px #888888",
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        width: "500px",
        margin: "auto",
        padding: "20px"
    },
    errorTitle: {
        fontSize: "2.5rem",
        marginBottom: "20px"
    },
    errorMessage: {
        fontSize: "1.5rem",
        marginBottom: "40px"
    },
    errorButton: {
        backgroundColor: "#38B6FF",
        border: "none",
        borderRadius: "5px",
        color: "#FFFFFF",
        fontSize: "1.2rem",
        padding: "10px 20px",
        cursor: "pointer"
    }
};

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

   styles = {
        ...styles,
        wrapper: {
            ...styles.wrapper,
            backgroundImage: `url(${backDropUrl})`
        }
    };

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
                <p>⭐️ {movie.Ratings?.[0]?.Value}</p>
                <p>{movie.Year}</p>
            </div>
        </div>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div style={styles.errorBoundary}>
            <h1 style={styles.errorTitle}>Oops! Something went wrong.</h1>
            <p style={styles.errorMessage}>Apologies for the inconvenience. Please try again later.</p>
            <button
                style={styles.errorButton}
                onClick={() => window.history.back()}
            >Go Back
            </button>
        </div>
    );
}