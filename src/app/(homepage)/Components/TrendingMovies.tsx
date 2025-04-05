// This will handle the async data fetching logic
async function getTrendingMovies(): Promise<{ id: string, title: string }[]> {
    const trendingMoviesRes = await fetch("http://localhost:3001/api/get-trending-movies", {
        cache: "no-store"
    });

    if (!trendingMoviesRes.ok) {
        throw new Error("Error retrieving trending movies.");
    }

    return await trendingMoviesRes.json();
}

// This function throws the promise that Suspense will handle
export default function TrendingMovies() {
    // This call to `getTrendingMovies` will throw the promise until it resolves
    const moviesPromise = getTrendingMovies();

    if (moviesPromise) {
        throw moviesPromise; // This will allow Suspense to manage loading state
    }

    // Once the promise resolves, return the list of movies
    return (
        <ul className="gap-3">
            {moviesPromise.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
            ))}
        </ul>
    );
}
