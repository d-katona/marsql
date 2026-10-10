"use client";

import { useSelector } from "@tanstack/react-form";
import { useEffect, useRef, useState } from "react";

export default function useDebounceForm(form, setStorage, storage, delay = 150) {
    const hydrated = useRef(false);
    const [debounced, setDebounced] = useState(storage);

    const value = useSelector(form.store, (state) => state.values);

    useEffect(() => {
        if (!hydrated.current) return;

        const timer = setTimeout(() => {
            setDebounced(value);
            setStorage(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay, setStorage]);

    useEffect(() => {
        hydrated.current = true;
        form.reset(storage)
    }, [])

    return debounced;
}