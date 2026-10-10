"use client";

import { useSelector } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import useSessionStorage from "./useSessionStorage";

export default function useDebounceForm(form, setStorage, delay = 250) {
    // const { setStorage, getStorage } = useSessionStorage(storeKey);

    const value = useSelector(form.store, (state) => state.values);
    const [debounced, setDebounced] = useState(value);

    // useEffect(() => {
    //     form.reset(storage);
    // }, [storage, form])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced(value);
            setStorage(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}