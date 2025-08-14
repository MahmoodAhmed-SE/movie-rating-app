"use client";

import styles from "./homepage.module.css";

import PromptComponent from "./Components/prompt/prompt";
import { useEffect, useRef, useState } from "react";
import PromptButton from "./Components/prompt/submitButton";
import PromptSearchContent from "./Components/prompt/promptSearchContent";
import Header from "../components/header/Header";




export default function Home() {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  useEffect(() => {
    handleKeyboardOffset(setKeyboardOffset)
  }, []);

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
          <div>
            <img src="/prompt/attach_icon.svg" alt="Attach icon button." />
          </div>
          <div className={styles.search_options_container}>
            <img src="/prompt/options_icon.svg" alt="Options icon button." />
            <div>Search Options</div>
          </div>
          <div style={{flexGrow: 1}}></div>
          <PromptButton ref={promptRef} setResults={setResults} setStatus={setPromptStatus} />
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