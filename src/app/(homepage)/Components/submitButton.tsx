import { RefObject } from "react";
import styles from "../homepage.module.css";
import { useRouter } from "next/navigation";

class ExternalApiRequest {
    constructor(
        public movie_name: string,
        public page_number: number
    ) { }
}

type Result = {
    id: string
    title: string
    plot: string
    transcript: string
    year_made: string
    authors: string
    directors: string
    actors: string
    genres: string
    languages: string
    runtime_minutes: string
    rating: string
    tags: string
    combination_embedding: string
    created_at: string
    updated_at: string
}

const submitPromptTextarea = async (
    ref: RefObject<HTMLTextAreaElement | null>,
    router: ReturnType<typeof useRouter>,
    setResults: any
) => {
    if (ref.current) {
        const movie_prompt = ref.current.value;
        const page_number = 1;

        const response = await fetch("api/prompt", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(new ExternalApiRequest(movie_prompt, page_number))
        })

        if (response.ok) {
            try {
                const data = await response.json();
                setResults((results: Result[]) => {
                    return (data.data) as Result;
                })
            } catch(err) {

            }
        } else if (response.status == 401) {
            router.push("/login")
        }
    } else {
        // handle no ref
    }
}


export default function PromptButton({ ref, setResults }: { ref: RefObject<HTMLTextAreaElement | null>, setResults: any}) {
    const router = useRouter();
    return (
        <button
            onClick={() => submitPromptTextarea(ref, router, setResults)}
            className={styles.prompt_submit_button}
        >
            Search
        </button>
    );
}