import { Modal } from 'antd';
import { useState } from 'react';
import { sdk } from '~/libs/client';
import { MY_EMAIL_KEY } from '~/constants';
import type { MovieList } from '~/generated/graphql';

const styles = {
    button: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        fontSize: "16px",
        cursor: "pointer",

        "&:hover": {
            backgroundColor: "#3e8e41"
        },

        "&:focus": {
            outline: "none"
        }
    },
    modal: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        gap: "1rem"
    },
    input: {
        width: "300px",
        padding: "12px 20px",
        margin: "8px 0",
        boxSizing: "border-box" as "border-box",
        border: "2px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#F7F7F7",
        fontSize: "16px",
        color: "#333",

        "&:focus": {
            outline: "none",
            border: "2px solid #6F9FFF",
            boxShadow: "0 0 0 2px #6F9FFF"
        }
    }
};

const NewPlaylistButton = ({ setPlaylists } : {
    setPlaylists: React.Dispatch<React.SetStateAction<MovieList[]>>
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playlistName, setPlaylistName] = useState('');

    const createNewPlaylist = async (playlistName: string) => {
        const res = await sdk.CreateList({
            input: {
                email: MY_EMAIL_KEY,
                name: playlistName
            }
        });

        setPlaylists((prev) => [...prev, {
            id: res.createList.id,
            name: res.createList.name,
            created_at: res.createList.created_at,
            email: res.createList.email,
        }]);
    }

    return (
        <>
            <Modal open={isModalOpen}
                closable={false}
                maskClosable={true}
                okText="Create Playlist"
                okButtonProps = {{ style: { backgroundColor: '#4CAF50' } }}
                cancelButtonProps = {{ style: { color: 'black' } }}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => {
                    createNewPlaylist(playlistName);
                    setIsModalOpen(false);
                }}
            >
                <div style={styles.modal}>
                    <h1>Create New Playlist</h1>
                    <input
                        type="text"
                        placeholder='Enter New Playlist name'
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        style={styles.input}
                    />
                </div>
            </Modal>
            <button style={styles.button} onClick={() => setIsModalOpen(true)}>Create New Playlist</button>
        </>
    );
}

export default NewPlaylistButton;