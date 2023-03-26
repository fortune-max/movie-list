import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { sdk } from '~/libs/client';

type ParamProps = {
    params: { playlistId: number };
};

export async function loader({ params }: ParamProps) {
    const { getMovieList } = await sdk.GetMovieList({
        getMovieListId: +params.playlistId
    });
    return json(getMovieList);
}
 
export default function Movie() {
    const data = useLoaderData<typeof loader>();
    console.log(data);
}