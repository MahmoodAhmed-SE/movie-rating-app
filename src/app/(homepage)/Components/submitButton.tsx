import { RefObject } from "react";
import styles from "../homepage.module.css";
import { useRouter } from "next/navigation";
import { Result } from "@/models/prompts";

class ExternalApiRequest {
    constructor(
        public movie_name: string,
        public page_number: number
    ) { }
}


const submitPromptTextarea = async (
    ref: RefObject<HTMLTextAreaElement | null>,
    router: ReturnType<typeof useRouter>,
    setResults: any,
    setStatus: any
) => {
    if (ref.current) {
        const movie_prompt = ref.current.value;
        const page_number = 1;

        setStatus("pending")
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
                    setStatus("success")
                    return (data.data) as Result;
                })
            } catch (err) {
                setStatus("failed")
            }
        } else if (response.status == 401) {
            router.push("/login")
        }
    } else {
        // handle no ref
    }
}

type Props = { ref: RefObject<HTMLTextAreaElement | null>, setResults: any, setStatus: any }

export default function PromptButton({ ref, setResults, setStatus }: Props) {
    const router = useRouter();
    return (
        <button
            onClick={() => submitPromptTextarea(ref, router, setResults, setStatus)}
            className={styles.prompt_submit_button}
        >
            Search
        </button>
    );
}