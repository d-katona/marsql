"use client";

import { useState } from "react";

export default function useSessionStorage(path) {

    const [storage] = useState(() => {
        console.log('storage')
        return JSON.parse(sessionStorage.getItem(`q_${path}`)) ?? null;
        // it was {}, but trying null instead
    })

    function setStorage(storage) {
        sessionStorage.setItem(`q_${path}`, JSON.stringify(storage))
    }
    return { storage, setStorage };
}