"use client";

import { useEffect, useState } from "react";

export default function useDebounce(value, setStorage, delay = 250) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced(value);
            setStorage(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay, setStorage]);

    return debounced;
}