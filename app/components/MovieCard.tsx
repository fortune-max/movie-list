import { sdk } from "~/libs/client";
import { useNavigate } from "@remix-run/react";
import type { MovieListItem } from "~/generated/graphql";

const styles = {
    movieCard: {
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "#ffffff",
        border: "1px solid #cccccc",
        borderRadius: "5px",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        overflow: "hidden",
        cursor: "pointer",
    },
    rightPanel: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
    },
    movieInfo: {
        flex: "1",
        padding: "20px"
    },
    movieTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        margin: "0 0 10px 0",
        width: "100px"
    },
    movieRating: {
        fontSize: "18px",
        fontWeight: "bold",
        margin: "0 0 10px 0"
    },
    movieYear: {
        fontSize: "16px",
        margin: "0"
    },
    poster: {
        width: "200px",
        height: "300px",
        objectFit: "cover" as "cover",
    }
};

const MovieCard = ({ movie, playlistId, setPlaylistMovies }: {
    movie: MovieListItem,
    playlistId: number,
    setPlaylistMovies: React.Dispatch<React.SetStateAction<MovieListItem[]>>
}) => {
    const navigate = useNavigate();
    return (
        <div
            style={styles.movieCard}
            onClick={() => navigate(`/movie/${movie.movie.imdbID}`)}
        >
            <img src={movie.movie.Poster || ""} alt="Movie Poster" style={styles.poster} />
            <div style={styles.rightPanel}>
                <div style={styles.movieInfo}>
                    <h2 style={styles.movieTitle}>{movie.movie.Title}</h2>
                    <p style={styles.movieRating}>{movie.movie.Ratings?.[0]?.Value}</p>
                    <p style={styles.movieYear}>{movie.movie.Year}</p>
                </div>
                <button
                    onClick={async (e) => {
                        e.stopPropagation();
                        await sdk.RemoveMovie({
                            removeMovieId: movie.id,
                            listId: playlistId,
                        });
                        setPlaylistMovies((movies) => movies.filter((m) => m.id !== movie.id));
                    }}
                >Remove</button>
            </div>
        </div>
    );
};

export default MovieCard;