import { format } from "date-fns";
import { sdk } from "~/libs/client";
import { useNavigate } from "@remix-run/react"
import type { MovieList } from "~/generated/graphql";

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',

        ':after': {
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#EEE',
            transition: 'background-color 0.2s ease'
        }
    },
    playlistImage: {
        width: '50px',
        height: '50px',
        objectFit: 'cover' as 'cover',
        marginRight: '10px',
        borderRadius: '50%',
        border: '2px solid white',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'
    },
    playlistName: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold' as 'bold',
        color: '#333',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
    },
    playlistDescription: {
        marginLeft: 'auto',
        fontSize: '14px',
        color: '#999'
    }
};

const prettyDate = (date: string) => format(new Date(date), 'dd MMM, yyyy');

const PlaylistListItem = ({ playlist, setPlaylists }: {
    playlist: MovieList,
    setPlaylists: React.Dispatch<React.SetStateAction<MovieList[]>>
}) => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}
            onClick={() => navigate(`/playlists/${playlist.id}`)}
        >
            <img style={styles.playlistImage} src={`https://picsum.photos/id/${playlist.id % 200}/50/50`} alt={playlist.name} />
            <div style={styles.playlistName}>{playlist.name}</div>
            <div style={styles.playlistDescription}>{prettyDate(playlist.created_at)}</div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Are you sure you want to delete the playlist "${playlist.name}"?`)) {
                        sdk.DeletePlaylist({ deleteListId: playlist.id });
                        setPlaylists(playlists => playlists.filter(p => p.id !== playlist.id));
                    }
                }}
            >🗑</button>
        </div>
    );
};

export default PlaylistListItem;