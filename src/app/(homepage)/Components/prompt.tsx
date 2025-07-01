'use client';

import styles from '../homepage.module.css' 

interface Props {
    shrink: boolean
}

export default ({shrink} : Props) => {
    const promptPlaceholder = "Type something...";

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const el = e.currentTarget;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    };

    return (
        <textarea
          onInput={handleInput}
          className={!shrink ? styles.prompt_input : styles.prompt_input_shrinked}
          placeholder={promptPlaceholder}
          rows={1}
        />
    );
}