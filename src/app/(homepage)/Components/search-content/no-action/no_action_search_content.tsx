'use client';

import styles from './no_action.module.css';

export default function NoActionSearchContent() {
    return (
        <div className={styles.no_action_container}>
            <h1>
                🧐 Find movies that match your mood,<br />
                values, and story preferences <br />
                —&nbsp;not&nbsp;just&nbsp;the&nbsp;plot.
            </h1>
            <h2>
                Examples
            </h2>
            <p>
                Family movie where the main character demonstrates strong values like patience, perseverance, and kindness to others.
            </p>
            <p>
                Historical drama movie that focuses on underdog characters changing the course of history through clever thinking and strategy.
            </p>
        </div>
    );
}