import type { LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export async function loader({params}: LoaderArgs) {
    const url = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
        headers: {
            accept: 'application/json',
            Authorization: process.env.MOVIEDB_AUTH,
        },
    }
    );
    return json(await url.json());
}

export default function MovieId() {
    const data = useLoaderData();
    return (
        <div className="min-h-screen p-10">
            <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} 
            alt="" 
            className="h-[40vh] object-cover w-full rounded-lg" 
            />
            <p className="text-4xl font-bold text-center pt-5">
                {data.title}
            </p>
            <div className="flex gap-x-10 mt-10">
                 <div className="w-1/2 font-medium">
                    <p className="text-2xl">
                        <span className="font-semibold text-teal-500">Website: </span>
                        <Link to={data.homepage} target="_blank"> 
                        <span  className="underline">Link</span> 
                        </Link> 
                    </p>
                    <p className="text-2xl">
                        <span className="font-semibold text-teal-500">Language: </span>
                        <span  className="">{data.original_language}</span>
                    </p>
                    <p className="text-2xl">
                        <span className="font-semibold text-teal-500">Overview: </span>
                        <span  className="text-2xl">{data.overview}</span>
                    </p>
                    <p className="text-2xl">
                        <span className="font-semibold text-teal-500">Release Date: </span>
                        <span  className="">{data.release_date}</span>
                    </p>
                 </div>
                 <div className="w-1/2">
                    <Outlet/>
                 </div>
            </div>
        </div>
    );
}