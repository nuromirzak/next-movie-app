import React from "react";
import Link from "next/link";
import styles from "./NotFound.module.css";

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <h1 className={styles.title}>404 - Page Not Found</h1>
            <p className={styles.message}>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/" className={styles.link}>
                <button>
                    Go back to homepage
                </button>
            </Link>
        </div>
    );
};
