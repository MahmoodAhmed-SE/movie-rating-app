"use client";

import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import { submitRegisterForm } from "./registerSubmission";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function RegisterationPage() {
  const router = useRouter();
  const [passVisible, setPassVisible] = useState(false);

  return (
    <div className={styles.register_form_container}>
      <div className={styles.register_header_container}>🎬 Get Started</div>
      <form
        onSubmit={(e) => submitRegisterForm(e, router)}
        className={styles.register_form}
        autoComplete="off"
      >
        <div className={styles.inputs_container}>
          <div className={styles.register_input}>
            <input
              type="text"
              name="email_input"
              placeholder="Email"
              autoComplete="off"
              className={styles.email_input}
              required
            />
          </div>
          <div className={styles.register_input}>
            <input
              type="text"
              name="username_input"
              placeholder="Username"
              autoComplete="off"
              className={styles.username_input}
              required
            />
          </div>
          <div>
            <div
              className={[
                styles.register_input,
                styles.password_container,
              ].join(" ")}
            >
              <input
                type={passVisible ? "text" : "password"}
                name="password_input"
                placeholder="Password"
                autoComplete="off"
                className={styles.password_input}
                required
              />
              <div
                className={styles.password_eye_container}
                onClick={() => setPassVisible(!passVisible)}
              >
                <Image
                  hidden={passVisible === true}
                  src={"/hidden_password_eye.svg"}
                  alt="Password is hidden."
                  width={35}
                  height={35}
                />
                <Image
                  hidden={passVisible === false}
                  src={"/shown_password_eye.svg"}
                  alt="Password is shown."
                  width={35}
                  height={35}
                />
              </div>
            </div>
            <div className={styles.password_criteria_container}>
              <div>
                <div>
                  <img
                    className={styles.invisible}
                    src="/pending_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                  <img
                    className={styles.visible}
                    src="/success_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                  <img
                    className={styles.invisible}
                    src="/failed_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                </div>
                <div className={styles.criteria_text}>Lower-case</div>
              </div>
              <div>
                <div>
                  <img
                    className={styles.visible}
                    src="/pending_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                  <img
                    className={styles.invisible}
                    src="/success_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                  <img
                    className={styles.invisible}
                    src="/failed_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                </div>
                <div className={styles.criteria_text}>Upper-case</div>
              </div>
              <div>
                <div>
                  <img
                    className={styles.visible}
                    src="/pending_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                  <img
                    className={styles.invisible}
                    src="/success_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                  <img
                    className={styles.invisible}
                    src="/failed_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                </div>
                <div className={styles.criteria_text}>Number</div>
              </div>
              <div>
                <div>
                  <img
                    className={styles.visible}
                    src="/pending_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                  <img
                    className={styles.invisible}
                    src="/success_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                  <img
                    className={styles.invisible}
                    src="/failed_criteria.svg"
                    alt="Password lower-case criteria icon."
                  />
                </div>
                <div className={styles.criteria_text}>
                  More than 8 characters
                </div>
              </div>
            </div>
          </div>
          <div className={[styles.register_input].join(" ")}>
            <input
              type="password"
              name="password_input"
              placeholder="Confirm Password"
              autoComplete="off"
              className={styles.password_input}
              required
            />
          </div>
        </div>
        <button type="submit" className={styles.form_submit_button}>
          Register
        </button>
      </form>
      <div className={styles.divider_container}>
        <hr className={styles.divider_line} />
        <div className={styles.divider_or_text}>or</div>
        <hr className={styles.divider_line} />
      </div>
      <div className={styles.auth_providers_container}>
        <div className={styles.google_auth_provider_container}>
          <img src="/google_icon.svg" alt="Google authentication provider." />
        </div>
        <div className={styles.microsoft_auth_provider_container}>
          <img
            src="/microsoft_icon.svg"
            alt="Microsoft authentication provider."
          />
        </div>
      </div>
      <div className={styles.login_question_container}>
        Already have an account?{" "}
        <Link href={"/login"} className={styles.login_link}>
          Sign In
        </Link>
      </div>
    </div>
  );
}
