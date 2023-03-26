import { useState } from 'react';
import { sdk } from '~/libs/client';
import { json } from "@remix-run/node";
import { MY_EMAIL_KEY } from "~/constants";
import { useLoaderData } from "@remix-run/react";
import PlaylistContainer from '~/components/PlaylistContainer';
import NewPlaylistButton from '~/components/NewPlaylistButton';

export async function loader() {
    const { getMovieLists } = await sdk.GetMovieLists({
        email: MY_EMAIL_KEY
    });
    return json(getMovieLists);
}

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        width: "100%"
    }
};

export default function Movie() {
    const data = useLoaderData<typeof loader>();
    const [playlists, setPlaylists] = useState(data);

    if (!playlists.length){
        return (
            <div style={styles.wrapper}>
                <h1>Movie Playlists</h1>
                <p>🙃 You have no playlists ... let's fix that!</p>
                <NewPlaylistButton setPlaylists={setPlaylists}/>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <h1>Movie Playlists</h1>
            <PlaylistContainer
                {...{setPlaylists, playlists}}
            />
        </div>
    );
}