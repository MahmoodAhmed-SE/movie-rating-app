"use client";

import styles from "./homepage.module.css";

import PromptComponent from "./Components/prompt";
import { useEffect, useRef, useState } from "react";
import PromptButton from "./Components/submitButton";
import PromptSearchContent from "./Components/promptSearchContent";
import Header from "../components/header/Header";




export default function Home() {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  useEffect(() => {
    handleKeyboardOffset(setKeyboardOffset)
  }, []);

  const filterPromptResult = () => { };
  const promptRef = useRef<HTMLTextAreaElement>(null)

  const [results, setResults] = useState([]);
  const [promptStatus, setPromptStatus] = useState("no-action") // success, failed, pending, no-action



  return (
    <main className={styles.homepage_main}>
      <Header />
      <div className={styles.promptContentContainer}>
        <PromptSearchContent promptStatus={promptStatus} results={results} />
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
          <PromptButton ref={promptRef} setResults={setResults} setStatus={setPromptStatus}/>
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