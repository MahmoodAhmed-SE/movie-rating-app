"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

import styles from "./login.module.css";

export default () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username_input");
    const password = formData.get("password_input");

    const response = await fetch("https://localhost:4040/api/v1/login-user", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      // Handle errors
    }
  }

  return (
    <div className={styles.login_form_container}>
      <form
        onSubmit={handleSubmit}
        className={styles.login_form}
        autoComplete="off"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username_input" className={styles.username_label}>
            Username
          </label>
          <input
            type="text"
            name="username_input"
            placeholder="Type your username.."
            autoComplete="off"
            className={styles.username_input}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password_input" className={styles.username_label}>
            Password
          </label>
          <input
            type="password"
            name="password_input"
            placeholder="Type your password.."
            autoComplete="off"
            className={styles.password_input}
            required
          />
        </div>
        <button type="submit" className={styles.form_submit_button}>Login</button>
      </form>
    </div>
  );
};
