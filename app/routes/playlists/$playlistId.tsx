import { useState } from 'react';
import { sdk } from '~/libs/client';
import { json } from "@remix-run/node";
import SearchBar from '~/components/SearchBar';
import { useLoaderData } from "@remix-run/react";
import MovieCardContainer from '~/components/MovieCardContainer';

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        gap: "1rem"
    }
};

type ParamProps = {
    params: { playlistId: string };
};

export async function loader({ params }: ParamProps) {
    const { getMovieList } = await sdk.GetMovieList({
        getMovieListId: +params.playlistId
    });
    const { getMovieListItems } = await sdk.GetMovieListItems({
        listId: +params.playlistId
    });
    return json({
        getMovieList,
        getMovieListItems
    });
}

export default function Playlist() {
    const { getMovieList, getMovieListItems} = useLoaderData<typeof loader>();
    const [playlistMovies, setPlaylistMovies] = useState(getMovieListItems);

    const addMovieToPlaylist = async (playlistId: number, imdbId: string) => {
        const res = await sdk.AddMovieToList({
            imdbId,
            listId: playlistId
        });
        setPlaylistMovies(prev => [...prev, res.addMovie]);
        return res;
    }

    if (!playlistMovies.length){
        return (
            <div style={styles.wrapper}>
                <h1>{getMovieList.name}</h1>
                <p>🙃 You have no movies in this playlist ... let's fix that!</p>
                <SearchBar handleAdd={addMovieToPlaylist} playlistId={getMovieList.id} playlistMovies={playlistMovies} />
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <h1>{getMovieList.name}</h1>
            <SearchBar handleAdd={addMovieToPlaylist} playlistId={getMovieList.id} playlistMovies={playlistMovies} />
            <MovieCardContainer movies={playlistMovies} playlistId={getMovieList.id} setPlaylistMovies={setPlaylistMovies} />
        </div>
    );
}