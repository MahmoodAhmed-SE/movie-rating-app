"use client";

import styles from "./homepage.module.css";

import PromptComponent from "./Components/prompt";
import { useEffect, useRef, useState } from "react";
import PromptButton from "./Components/submitButton";


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

export default function Home() {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  useEffect(() => {
    handleKeyboardOffset(setKeyboardOffset)
  }, []);

  const filterPromptResult = () => { };
  const promptRef = useRef<HTMLTextAreaElement>(null)

  const [results, setResults] = useState([]);
  return (
    <main className={styles.homepage_main}>
      <div className={styles.prompt_search_result_container}>
        {
          results.map((watchItem: Result) => {
            return (
              <div className={styles.prompt_search_result_item} key={watchItem.id}>
                <div>id:{watchItem.id}</div>
                <div>title:{watchItem.title}</div>
                <div>year:{watchItem.year_made}</div>
              </div>
            );
          })
        }
      </div>


      <div
        className={styles.prompt_input_container}
        style={{ bottom: `${keyboardOffset}px` }}
      >
        <PromptComponent reference={promptRef} />
        <div className={styles.prompt_options_container}>
          <div className="flex-grow" />
          <button
            onClick={filterPromptResult}
            className={styles.prompt_filter_button}
          >
            Filter
          </button>
          <PromptButton ref={promptRef} setResults={setResults} />
        </div>
      </div>
    </main>
  );
}


const handleKeyboardOffset = (setKeyboardOffset: any) => {
  const updateKeyboardOffset = () => {
    const height = window.innerHeight;
    const visual = window.visualViewport;

    if (visual) {
      const offset = height - visual.height - visual.offsetTop;
      setKeyboardOffset(offset > 0 ? offset : 0);
    }
  };

  window.visualViewport?.addEventListener("resize", updateKeyboardOffset);
  window.visualViewport?.addEventListener("scroll", updateKeyboardOffset);

  return () => {
    window.visualViewport?.removeEventListener(
      "resize",
      updateKeyboardOffset
    );
    window.visualViewport?.removeEventListener(
      "scroll",
      updateKeyboardOffset
    );
  };
}