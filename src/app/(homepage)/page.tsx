"use client";

import styles from "./homepage.module.css";

import PromptComponent from "./Components/prompt";
import { useEffect, useRef, useState } from "react";
import { ShrinkArrowSVG, UnshrinkArrowSVG } from "./SvgIcons/arrow";
import PromptButton from "./Components/submitButton";

export default function Home() {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  useEffect(() => {
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
  }, []);

  const [isShrinked, setIsShrinked] = useState(false);

  const filterPromptResult = () => { };
  const promptRef = useRef<HTMLTextAreaElement>(null)

  return (
    <>
      <div
        className={styles.prompt_input_container}
        style={{ bottom: `${keyboardOffset}px` }}
      >
        <button
          onClick={() => {
            setIsShrinked(!isShrinked);
          }}
          className={styles.shrink_icon_button}
        >
          {!isShrinked ? ShrinkArrowSVG() : UnshrinkArrowSVG()}
        </button>
        <PromptComponent shrink={isShrinked} reference={promptRef} />
        <div className={styles.prompt_options_container}>
          <div className="flex-grow" />
          <button
            onClick={filterPromptResult}
            className={styles.prompt_filter_button}
          >
            Filter
          </button>
          <PromptButton ref={promptRef} />
        </div>
      </div>
    </>
  );
}