import { format } from "date-fns";
import styled from "styled-components";
import { useNavigate } from "@remix-run/react"
import type { MovieList } from "~/generated/graphql";

const PlaylistListItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

        background-color: #EEE;
        transition: background-color 0.2s ease;
    }

    &.active {
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
`;

const PlaylistImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const PlaylistName = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const PlaylistDescription = styled.p`
    margin-left: auto;
    font-size: 14px;
    color: #999;
`;

const prettyDate = (date: string) => format(new Date(date), 'dd MMM, yyyy');

const PlaylistListItem = ({ playlist }: { playlist: MovieList }) => {
    const navigate = useNavigate();

    return (
        <PlaylistListItemContainer
            onClick={() => navigate(`/playlists/${playlist.id}`)}
        >
            <PlaylistImage src={`https://picsum.photos/id/${playlist.id}/50/50`} alt={playlist.name} />
            <PlaylistName>{playlist.name}</PlaylistName>
            <PlaylistDescription>{prettyDate(playlist.created_at)}</PlaylistDescription>
        </PlaylistListItemContainer>
    );
};

export default PlaylistListItem;