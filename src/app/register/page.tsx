"use client";

import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import { submitRegisterForm } from "./registerSubmission";

export default function RegisterationPage() {
  const router = useRouter();

  return (
    <div className={styles.register_form_container}>
      <form
        onSubmit={(e) => submitRegisterForm(e, router)}
        className={styles.register_form}
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
        <button type="submit" className={styles.form_submit_button}>Register</button>
      </form>
    </div>
  );
};