'use client';

import styles from './homepage.module.css' 

import PromptComponent from './Components/prompt'
import { useEffect, useState } from 'react';


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
      window.visualViewport?.removeEventListener("resize", updateKeyboardOffset);
      window.visualViewport?.removeEventListener("scroll", updateKeyboardOffset);
    };
  }, []);


  const [isShrinked, setIsShrinked] = useState(false)
    
  const fetchPromptResult = () => {}

  const filterPromptResult = () => {}
  

  return (
    <>
        <div 
          className={styles.prompt_input_container}
          style={{ bottom: `${keyboardOffset}px` }}
        >
          <button 
            onClick={() => { setIsShrinked(!isShrinked)}} 
            className={styles.shrink_icon_button}
          >
            {!isShrinked ? ShrinkArrowSVG() : UnshrinkArrowSVG()}
          </button>
          <PromptComponent shrink={isShrinked} /> 
          <div className={styles.prompt_options_container}>
            <div className='flex-grow' />
            <button 
              onClick={filterPromptResult}
              className={styles.prompt_filter_button}
            >
              Filter
            </button> 
            <button 
              onClick={fetchPromptResult}
              className={styles.prompt_submit_button}
            >
              Search
            </button> 
          </div>
        </div>
    </>
  );
}


const ShrinkArrowSVG = () => {
  return (
<svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
  );
}

const UnshrinkArrowSVG = () => {
  return (
    <svg
  className="w-5 h-5 text-gray-500 rotate-180"
  fill="currentColor"
  viewBox="0 0 20 20"
>
  <path
    fillRule="evenodd"
    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
    clipRule="evenodd"
  />
</svg>
  );
}
