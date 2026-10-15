"use client";

import { useForm, useSelector } from "@tanstack/react-form";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { POST } from "../client/http";
import useSessionStorage from "./useSessionStorage";

export default function useDebounceData(storageKey, queryKey, url, select, storageOverride, delay = 150) {
    const { storage, setStorage } = useSessionStorage(storageKey);

    const hydrated = useRef(false);
    const [debounce, setDebounce] = useState(storageOverride ?? storage);

    const form = useForm();
    const value = useSelector(form.store, (state) => state.values);

    useEffect(() => {
        if (!hydrated.current) return;

        const timer = setTimeout(() => {
            setDebounce(value);
            if (storageKey) setStorage(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay, setStorage, storageKey]);

    useEffect(() => {
        hydrated.current = true;
        form.reset(storageOverride ?? storage)
    }, [form, storage, storageOverride])
    // form & storage added

    const { data, isFetching } = useQuery({
        queryKey: [...queryKey, debounce],
        queryFn: ({ queryKey, signal }) => {
            const debounced = queryKey.at(-1);
            return POST(url, debounced, signal)
        },
        ...(select && { select }),
        placeholderData: keepPreviousData
    })


    return [form, data, isFetching];
}