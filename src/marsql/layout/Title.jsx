"use client";

import { useEffect } from "react";
import { useNavigationContext } from "../providers/Navigation";

export default function Title({ title, title1, title2, loading, overlay }) {
    const { setTitle, setLoading } = useNavigationContext();

    useEffect(() => {
        setTitle({ title, title1, title2, loading });
        return () => {
            setTitle({})
        }
    }, [title, title1, title2, setTitle, loading])

    useEffect(() => {
        if (overlay) setLoading(loading);
        return () => {
            setLoading(false);
        }
    }, [loading, overlay, setLoading])

    return null;
}