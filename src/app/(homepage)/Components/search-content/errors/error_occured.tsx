import styles from "./error_occured.module.css";

export default function ErrorOccured() {
  return (
    <div className={styles.error_occured_container}>
      <h1>Error occured 😔</h1>
      <h2>Please try again later</h2>
    </div>
  );
}
