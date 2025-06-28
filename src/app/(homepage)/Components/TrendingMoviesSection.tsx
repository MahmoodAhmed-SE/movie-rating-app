import { Suspense } from "react";
import TrendingMovies from "./TrendingMovies";

export default function TrendingMoviesSection() {
    return (
        <section
            aria-labelledby="Trending movies"
            className="p-6 text-gray-700"
        >
            <h1 className="font-bold text-3xl mb-4">Trending movies: </h1>
            <div className="p-2">
                <Suspense fallback={<div>Loading...</div>}>
                    <TrendingMovies />
                </Suspense>
            </div>
        </section>
    );
}
