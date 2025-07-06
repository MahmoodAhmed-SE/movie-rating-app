"use client";

import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { submitLoginForm } from "./loginSubmission";

export default () => {
  const router = useRouter();

  return (
    <div className={styles.login_form_container}>
      <form
        onSubmit={(e) => submitLoginForm(e, router)}
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
