import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "RemixV2 Moviesite" },
    { name: "description", content: "RemixV2 test site!" },
  ];
};

export async function loader({params}: LoaderArgs) {
  const url = await fetch(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzIzMWJiNmE2NzkyOGVkOTIxZTAwN2RiNWYyZGU0MSIsInN1YiI6IjY0ZGZlN2M5MDc2Y2U4MDBjNjQxYzRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zv5lnK-KncQOb9mn5Idh_DffMZYnrG2R-wW7_c4SAos',
      },
    
    }
  );
  return json(await url.json());
}

export default function Index() {
  const data = useLoaderData();

  return (
<div className="bg-white py-6 sm:py-8 lg:py-12">
<div className="mx-auto max-w-screen-2xl px-4 md:px-8">
  <div className="mb-10 md:mb-16">
    <p className="mb-4 text-center text-3xl font-bold text-gray-800 md:mb-6 lg:text-4xl">
      Top Trending Movies
    </p>
  </div>
  <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
{data.results.map((movie: any) => (
<div key={movie.id} className="flex flex-col overflow-hidden rounded-lg border bg-white">
  <Link prefetch="intent" className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64" to={`movie/${movie.id}/comments`} >
<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.id}`} className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"/>
  </Link>
  <div className="flex flex-col flex-1 p-4 sm:p-6">
    <p className="mb-2 text-xl font-semibold text-gray-800">
      <Link to={`movie/${movie.id}/comments`} prefetch="intent" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">
        {movie.title}
      </Link>
    </p>
    <p className="text-gray-500 line-clamp-3">{movie.overview} </p>
  </div>
</div>
))}
  </div>
</div>
</div>
    
  );
}
