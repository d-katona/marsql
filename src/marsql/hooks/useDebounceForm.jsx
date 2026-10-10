"use client";

import { useSelector } from "@tanstack/react-form";
import { useEffect, useRef, useState } from "react";
import useSessionStorage from "./useSessionStorage";

export default function useDebounceForm(form, setStorage, storage, delay = 150) {
    // const { setStorage, getStorage } = useSessionStorage(storeKey);
    const hydrated = useRef(false);
    const [debounced, setDebounced] = useState(storage);


    const value = useSelector(form.store, (state) => state.values);

    // useEffect(() => {
    //     form.reset(storage);
    // }, [storage, form])

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