"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect, useRef, useState } from "react";

export default function useSubmit(setStorage, storage) {
    const hydrated = useRef(false);
    const [debounced, setDebounced] = useState(storage);

    const form = useForm({
        onSubmit: ({ value }) => { setDebounced(value) }
    });

    useEffect(() => {
        setStorage(debounced);
    }, [debounced, setStorage])
    //setStorage added

    useEffect(() => {
        hydrated.current = true;
        form.reset(storage)
    }, [form, storage])
    // form & storage added

    return [form, debounced];
}