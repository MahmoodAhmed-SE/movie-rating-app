"use client";

import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { submitLoginForm } from "./loginSubmission";
import Link from "next/link";
import { useState } from "react";

export default () => {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState("Invalid credintials.");
  const messageVisibility =
    submitMessage.length == 0 ? styles.invisible : styles.visible;

  return (
    <div className={styles.login_form_container}>
      <div className={styles.login_header_container}>👋 Welcome Back!</div>
      <form
        onSubmit={(e) => submitLoginForm(e, router)}
        className={styles.login_form}
        autoComplete="off"
      >
        <div className={[styles.submit_message, messageVisibility].join(" ")}>
          {submitMessage}
        </div>
        <div className={styles.inputs_container}>
          <div className={styles.login_input}>
            <input
              type="text"
              name="username_input"
              placeholder="Username or Email"
              autoComplete="off"
              className={styles.username_input}
              required
            />
          </div>
          <div className={styles.login_input}>
            <input
              type="password"
              name="password_input"
              placeholder="Password"
              autoComplete="off"
              className={styles.password_input}
              required
            />
            <div className={styles.forgot_password_container}>
              <Link href={'/forgot-password'}>Forgot password?</Link>
            </div>
          </div>
        </div>
        <button type="submit" className={styles.form_submit_button}>
          Login
        </button>
      </form>
      <div className={styles.divider_container}>
        <hr className={styles.divider_line} />
        <div className={styles.divider_or_text}>or</div>
        <hr className={styles.divider_line} />
      </div>
      <div className={styles.auth_providers_container}>
        <div className={styles.google_auth_provider_container}>Icon</div>
        <div className={styles.microsoft_auth_provider_container}>Icon</div>
      </div>
      <div className={styles.registeration_question_container}>
        Don't have an account?{" "}
        <Link href={"/register"} className={styles.signup_link}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};
