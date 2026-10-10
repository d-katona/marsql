"use client";

import { useEffect } from "react";
import { useNavigationContext } from "../providers/Navigation";

export default function Title({ title, title1, title2 }) {
    const { setTitle } = useNavigationContext();

    useEffect(() => {
        setTitle({ title, title1, title2 });
        return () => {
            setTitle("")
        }
    }, [title, title1, title2, setTitle])

    return null;
}