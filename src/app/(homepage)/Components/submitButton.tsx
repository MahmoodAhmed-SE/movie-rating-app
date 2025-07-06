import { RefObject } from "react";
import styles from "../homepage.module.css";

class ExternalApiRequest {
    constructor(
        public movie_name: string,
        public page_number: number
    ) { }
}

const submitPromptTextarea = async (ref: RefObject<HTMLTextAreaElement | null>) => {
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
            console.log(await response.json());
        }
    } else {
        // handle no ref
    }
}


export default function PromptButton({ref}: {ref: RefObject<HTMLTextAreaElement | null>}) {
    return (
        <button
            onClick={() => submitPromptTextarea(ref)}
            className={styles.prompt_submit_button}
        >
            Search
        </button>
    );
}