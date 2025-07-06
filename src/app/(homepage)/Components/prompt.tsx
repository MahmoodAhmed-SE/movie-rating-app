'use client';

import { Ref } from 'react';
import styles from '../homepage.module.css'

interface Props {
  shrink: boolean,
  reference: Ref<HTMLTextAreaElement>
}


export default ({ shrink, reference }: Props) => {
  const promptPlaceholder = "Type something...";

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <textarea
      ref={reference}
      onInput={handleInput}
      className={!shrink ? styles.prompt_input : styles.prompt_input_shrinked}
      placeholder={promptPlaceholder}
      rows={1}
    />
  );
}