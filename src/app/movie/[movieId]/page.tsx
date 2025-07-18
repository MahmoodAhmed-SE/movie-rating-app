'use client';

import { use, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function Movies({
    params,
}: {
    params: Promise<{ movieId: string }>
}) {
    const { movieId } = use(params);

    const [movie, setMovie] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await fetch(`/api/movie/${movieId.trim()}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await res.json();
                if (!res.ok) {
                    setError(data.message || 'Failed to fetch movie');
                } else {
                    setMovie(data.data); // Assuming the response has { message, data }
                }
            } catch (err) {
                setError('Unexpected error');
            }
        };

        fetchMovie();
    }, [movieId]);

    return movie
        ? (
            <>
                Movie tile: {movie.title}
            </>
        ) : (
            <Skeleton height="100%" width="100%" baseColor="#f5f5f5" highlightColor="#333333"/>
        );
}