"use client";

import { useForm, useSelector } from "@tanstack/react-form";
import { useEffect, useRef, useState } from "react";

export default function useDebounce(setStorage, storage, delay = 150) {
    const hydrated = useRef(false);
    const [debounced, setDebounced] = useState(storage);

    const form = useForm();
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
    }, [form, storage])
    // form & storage added

    return [form, debounced];
}