"use client";

import {useSearchParams, useRouter} from "next/navigation";
import styles from "./Pagination.module.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export const Pagination = ({currentPage, totalPages}: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        return params.toString();
    };

    const onPageChange = (newPage: number) => {
        router.push("?" + createQueryString("page", String(newPage)));
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.button}
                disabled={currentPage === 1}
                onClick={() => {
                    return onPageChange(currentPage - 1);
                }}
            >
                ⬅️ Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
                className={styles.button}
                disabled={currentPage === totalPages}
                onClick={() => {
                    return onPageChange(currentPage + 1);
                }}
            >
                Next ➡️
            </button>
        </div>
    );
};
