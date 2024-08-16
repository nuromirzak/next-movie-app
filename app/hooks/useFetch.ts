import { useState, useEffect } from "react";

interface FetchState<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
}

// I don't use it in the code, because I don't need it anymore, but I'll leave it here for reference
export function useFetch<T>(url: string): FetchState<T> {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setState({ data, error: null, loading: false });
            } catch (error) {
                setState({ data: null, error: error as Error, loading: false });
            }
        };

        fetchData();
    }, [url]);

    return state;
}
