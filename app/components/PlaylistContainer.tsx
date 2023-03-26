import PlaylistListItem from "./PlaylistListItem";
import type { MovieList } from "~/generated/graphql";
import NewPlaylistButton from "./NewPlaylistButton";

const styles = { 
        wrapper: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        gap: '1rem',
        transition: 'all 0.2s ease-in-out',
        width: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#F4F4F4',
        borderRadius: '10px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        maxHeight: '500px',
        overflowY: 'scroll' as 'scroll'
    }
};

type PlaylistContainerProps = {
    playlists: MovieList[],
    setPlaylists: React.Dispatch<React.SetStateAction<MovieList[]>>
};

const PlaylistContainer = ({ playlists, setPlaylists }: PlaylistContainerProps) => {
    return (
        <div style={styles.wrapper}>
            {playlists.map((playlist) => (
                <PlaylistListItem
                    key={playlist.id}
                    playlist={playlist}
                    setPlaylists={setPlaylists}
                />
            ))}
            <NewPlaylistButton setPlaylists={setPlaylists}/>
        </div>
    );
};

export default PlaylistContainer;