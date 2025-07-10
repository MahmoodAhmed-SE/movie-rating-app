'use client';

import { Ref } from 'react';
import styles from '../homepage.module.css'

interface Props {
  reference: Ref<HTMLTextAreaElement>
}


export default ({ reference }: Props) => {
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
      className={styles.prompt_input}
      placeholder={promptPlaceholder}
      rows={1}
    />
  );
}