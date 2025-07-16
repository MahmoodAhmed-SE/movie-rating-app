'use client';

import styles from './searchContent.module.css';

export default function NoActionSearchContent() {
    return (
        <div className={styles.noActionContainer}>
            <p className={styles.noActionParagraph}>
                This is a website that allows Movie enthusiasts to search movies based on what 
                they actually want from the plot.
            </p>
        </div>
    );
}