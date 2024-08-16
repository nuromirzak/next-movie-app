"use client";

import {useState} from "react";
import Link from "next/link";
import styles from "./Dropdown.module.css";

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <button className={styles.dropdownToggle} onClick={toggleDropdown}>
                🎬 Movies <span className={styles.dropdownArrow}>▼</span>
            </button>
            {isOpen && (
                <div className={styles.dropdownContent}>
                    <Link href="/?type=anime" passHref>
                        <button onClick={handleLinkClick} className={styles.dropdownButton}>🍥 Anime</button>
                    </Link>
                    <Link href="/?type=movie" passHref>
                        <button onClick={handleLinkClick} className={styles.dropdownButton}>🎬 Movies</button>
                    </Link>
                    <Link href="/?type=tv-series" passHref>
                        <button onClick={handleLinkClick} className={styles.dropdownButton}>📺 TV Series</button>
                    </Link>
                    <Link href="/?type=cartoon" passHref>
                        <button onClick={handleLinkClick} className={styles.dropdownButton}>🐰 Cartoons</button>
                    </Link>
                    <Link href="/?type=animated-series" passHref>
                        <button onClick={handleLinkClick} className={styles.dropdownButton}>🌈 Animated Series</button>
                    </Link>
                </div>
            )}
        </div>
    );
};
