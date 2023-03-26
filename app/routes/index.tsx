import { useState } from 'react';
import { sdk } from '~/libs/client';
import { json } from "@remix-run/node";
import { MY_EMAIL_KEY } from "~/constants";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import PlaylistContainer from '~/components/PlaylistContainer';

export async function loader(args: LoaderArgs) {
    const { getMovieLists } = await sdk.GetMovieLists({
        email: MY_EMAIL_KEY
    });
    return json(getMovieLists);
}

export default function Movie() {
    const data = useLoaderData<typeof loader>();
    const [playlists, setPlaylists] = useState(data);

    return (
        <PlaylistContainer
            playlists={playlists} setPlaylists={setPlaylists}
        />
    );
}