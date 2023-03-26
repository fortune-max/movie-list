import styled from "styled-components";
import PlaylistListItem from "./PlaylistListItem";
import type { MovieList } from "~/generated/graphql";
import NewPlaylistButton from "./NewPlaylistButton";

const PlaylistWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 5px;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;

    width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #F4F4F4;
    border-radius: 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

type PlaylistContainerProps = {
    playlists: MovieList[],
    setPlaylists: React.Dispatch<React.SetStateAction<MovieList[]>>
};

const PlaylistContainer = ({ playlists, setPlaylists }: PlaylistContainerProps) => {
    return (
        <PlaylistWrapper>
            {playlists.map((playlist) => (
                <PlaylistListItem
                    key={playlist.id}
                    playlist={playlist}
                />
            ))}
            <NewPlaylistButton setPlaylists={setPlaylists}/>
        </PlaylistWrapper>
    );
};

export default PlaylistContainer;