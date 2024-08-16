import styles from "./Page.module.css";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className={styles.about}>
            <h1 className={styles.title}>About Me and This Project</h1>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>About This Project</h2>
                <p>This is my first project built with Next.js. It&apos;s been an exciting learning experience, allowing
                    me to explore server-side rendering, API routes, and the overall Next.js ecosystem.</p>
                <p>For the movie data, I&apos;ve utilized the API from <Link href="https://kinopoisk.dev/"
                                                                             className={styles.link} target="_blank"
                                                                             rel="noopener noreferrer">kinopoisk.dev</Link>.
                    This fantastic resource has allowed me to provide up-to-date and comprehensive movie information.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Contribute</h2>
                <p>I&apos;m always looking to improve and learn. If you have any suggestions or want to contribute to
                    this project, I&apos;d be thrilled to receive your pull requests!</p>
                <p>You can find the project repository on my GitHub:</p>
                <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <button>
                        GitHub Profile
                    </button>
                </Link>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Thank You!</h2>
                <p>Thank you for visiting my site and being a part of my learning journey. I hope you enjoy exploring
                    the world of cinema through this application!</p>
            </section>
        </div>
    );
}
