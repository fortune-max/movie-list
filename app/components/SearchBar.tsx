import { useState } from 'react';
import { sdk } from '~/libs/client';
import { useNavigate } from "react-router-dom";
import type { StylesConfig } from 'react-select';
import Select, { components } from 'react-select';
import type { Movie, MovieListItem } from '~/generated/graphql';

const searchMovies = async (searchTerm: string): Promise<Movie[]> => {
    const res = await sdk.SearchMovieByTitle({
        title: searchTerm
    });
    return res.searchMovieByTitle as Movie[];
}

type OptionProps = {
    value: string;
    label: string;
    image: string;
    year: string;
};

const styles = {
    options: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px'
    },
    optionThumbnail: {
        width: '50px',
        height: '70px'
    },
};

const customStyles: StylesConfig<OptionProps, false> = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#F7F7F7',
        borderRadius: '5px',
        border: `2px solid ${state.isFocused ? '#6F9FFF' : '#ccc'}`,
        boxShadow: state.isFocused ? '0 0 0 2px #6F9FFF' : 'none',
        '&:hover': {
            border: `2px solid ${state.isFocused ? '#6F9FFF' : '#ccc'}`,
            boxShadow: state.isFocused ? '0 0 0 2px #6F9FFF' : 'none'
        }
    }),
    input: (provided) => ({
        ...provided,
        color: '#333',
        fontSize: '16px',
        width: '400px'
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        color: '#333'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#999',
        fontStyle: 'italic'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#6F9FFF' : 'white',
        color: state.isFocused ? 'white' : '#333',
        '&:hover': {
            backgroundColor: state.isFocused ? '#6F9FFF' : '#F7F7F7',
            color: state.isFocused ? 'white' : '#333'
        }
    }),
    menu: (provided) => ({
        ...provided,
        border: '2px solid #6F9FFF',
        borderRadius: '5px'
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '0',
        maxHeight: '200px',
        overflowY: 'auto'
    })
};
  

const SearchBar = ({ handleAdd, playlistId, playlistMovies }: {
    handleAdd: (playlistId: number, imdbId: string) => void,
    playlistId: number,
    playlistMovies: MovieListItem[]
}) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [options, setOptions] = useState<OptionProps[]>([]);

    const validSearchResults = (movieResult: Movie) => {
        if (playlistMovies.find(playlistMovie => playlistMovie.movie.imdbID === movieResult.imdbID))
            return false;

        if (movieResult.Poster && movieResult.Poster !== "N/A")
            return true;
    };

    const fetchSuggestions = async (searchTerm: string) => {
        const res = await searchMovies(searchTerm);
        setOptions(
            res?.filter(validSearchResults).map((movie) => {
                return {
                    value: movie.imdbID || "",
                    label: movie.Title || "",
                    image: movie.Poster || "",
                    year: movie.Year || ""
                }
            })
        );
    };

    const handleInputChange = (newInput: string) => {
        setSearchTerm(newInput);
        fetchSuggestions(newInput);
    };

    const Option = (props: any) => {
        return (
            <components.Option {...props}>
                <div style={styles.options}>
                    <img
                        src={props.data.image}
                        alt={`${props.data.label} thumbnail`}
                        style={styles.optionThumbnail}
                    />
                    {props.data.label} ({props.data.year}) 
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAdd(playlistId, props.data.value);
                            setOptions(options.filter(option => option.value !== props.data.value));
                        }}
                    >+</button>
                </div>
            </components.Option>
        );
    };

    return (
        <Select
            onChange={(e) => navigate(`/movie/${e?.value}`)}
            isSearchable={true}
            inputValue={searchTerm}
            onInputChange={handleInputChange}
            options={options}
            components={{ Option }}
            styles={customStyles}
            placeholder="Search for a movie to add to Playlist..."
            noOptionsMessage={() => "No movies found"}
        />
    );
};

export default SearchBar;