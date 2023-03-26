const API_KEY = process.env.API_KEY;

export async function getBackdropUrl(imdb_id: string) {
    const response = await fetch(`https://api.themoviedb.org/3/find/${imdb_id}?api_key=${API_KEY}&language=en-US&external_source=imdb_id`);
    const data = await response.json();
    if (data?.movie_results?.[0]?.backdrop_path)
        return `https://image.tmdb.org/t/p/original/${data.movie_results[0].backdrop_path}`;
    return "https://image.tmdb.org/t/p/original/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg";
}
