import MovieCard from "./MovieCard";
import type { MovieListItem } from "~/generated/graphql";

const styles = {
    movieCardContainer: {
        display: "flex",
        flexWrap: "wrap" as const,
        gap: "20px",
        width: "100%",
        justifyContent: "center",
    },
};

const MovieCardContainer = ({ movies, playlistId, setPlaylistMovies } : {
    movies: MovieListItem[],
    playlistId: number,
    setPlaylistMovies: React.Dispatch<React.SetStateAction<MovieListItem[]>>
}) => {
    return (
        <div style={styles.movieCardContainer}>
            {movies.map((movie, idx) => (
                <MovieCard key={idx} movie={movie} playlistId={playlistId} setPlaylistMovies={setPlaylistMovies}/>
            ))}
        </div>
    );
};

export default MovieCardContainer;