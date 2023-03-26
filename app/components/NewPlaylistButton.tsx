import { Modal } from 'antd';
import { useState } from 'react';
import { sdk } from '~/libs/client';
import styled from 'styled-components';
import { MY_EMAIL_KEY } from '~/constants';
import type { MovieList } from '~/generated/graphql';

const CreatePlaylistButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #3e8e41;
  }

  &:focus {
    outline: none;
  }
`;

type NewPlaylistButtonProps = {
    setPlaylists: React.Dispatch<React.SetStateAction<MovieList[]>>
};

const NewPlaylistButton = ({ setPlaylists } : NewPlaylistButtonProps) => {
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
                <h1>Create New Playlist</h1>
                <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
            </Modal>
            <CreatePlaylistButton onClick={() => setIsModalOpen(true)}>Create New Playlist</CreatePlaylistButton>
        </>
    );
}

export default NewPlaylistButton;