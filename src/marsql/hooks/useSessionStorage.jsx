"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export default function useSessionStorage(path) {

    // const getStorage = useMemo(() => {
    //     console.log('hetting session')
    //     return JSON.parse(sessionStorage.getItem(`q_${path}`)) ?? {}
    // }, [])
    // const getStorage = useCallback(() => {
    //     console.log('hetting session')
    //     return JSON.parse(sessionStorage.getItem(`q_${path}`)) ?? {}
    // }, [path])



    const [storage] = useState(() => {
        console.log('storage')
        return JSON.parse(sessionStorage.getItem(`q_${path}`)) ?? {}
    })

    function setStorage(storage) {
        sessionStorage.setItem(`q_${path}`, JSON.stringify(storage))
    }
    return { storage, setStorage };

    // function getStorage() {
    //     console.log('getting session')
    //     return JSON.parse(sessionStorage.getItem(`q_${path}`)) ?? {}
    // }
    // function setStorage(storage) {
    //     sessionStorage.setItem(`q_${path}`, JSON.stringify(storage));
    // }
    // return { getStorage, setStorage }

    // const [getStorage, setStorage] = useState(
    //     JSON.parse(sessionStorage.getItem(`q_${path}`)) ?? {}
    // );

    // useEffect(() => {
    //     sessionStorage.setItem(`q_${path}`, JSON.stringify(storage));
    // }, [storage, path])

    // return [storage, setStorage];
}