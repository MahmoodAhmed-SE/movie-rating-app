interface MovieDTO {
  id: string;
  name: string;
  description: string;
  images: string[];
  release_date: string;
  director: string;
  rating_average: number;
  duration: string;
}

async function getTrendingMovies(): Promise<{
  movies: MovieDTO[];
  error: boolean;
}> {
  let trendingMoviesRes;

  try {
    trendingMoviesRes = await fetch(
      "http://127.0.0.1:4040/api/v1/retrieve-movies",
      {
        cache: "no-cache",
        headers: { authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDQwNTg0NjksImlkIjoxM30.NgWL49bXiiKibEAbKH34cyz1HiRwPO71Jqxju-VpshQ" },
      }
    );

    if (!trendingMoviesRes.ok) {
      console.log(trendingMoviesRes);
      throw new Error("Error retrieving trending movies.");
    }
  } catch (err) {
    console.log(err);
    return { movies: [], error: true };
  }

  try {
    const data = await trendingMoviesRes.json();
    return { movies: data, error: false };
  } catch (err) {
    console.log(err);
    return { movies: [], error: true };
  }
}

export default async function TrendingMovies() {
  const { movies: movies, error } = await getTrendingMovies();

  if (error) {
    return <p className="text-red-500">Failed to load trending movies.</p>;
  }

  return (
    <ul className="gap-3">
      {movies.map((movie) => (
        <li key={movie.id}>{movie.name} and {movie.description.slice(0, 50)}...</li>
      ))}
    </ul>
  );
}
