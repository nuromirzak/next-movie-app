"use client";

import {useRouter} from "next/navigation";
import styles from "./Navbar.module.css";
import {Dropdown} from "@/app/components/Dropdown";
import Link from "next/link";
import React, {FormEvent} from "react";

export const Navbar = () => {
    const router = useRouter();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = e.currentTarget.search.value;
        if (query.trim()) {
            router.push(`/?query=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.links}>
                <Link href="/" className={styles.link}>🏠 Home</Link>
                <Dropdown/>
                <Link href="/about" className={styles.link}>ℹ️ About</Link>
            </div>
            <div className={styles.links}>
                <Link href="/movies/random" className={styles.randomButton}>
                    <button>
                        🎲 Random Movie
                    </button>
                </Link>
                <form className={styles.searchForm} onSubmit={handleSearch}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search movies..."
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>🔍</button>
                </form>
            </div>
        </nav>
    );
};
