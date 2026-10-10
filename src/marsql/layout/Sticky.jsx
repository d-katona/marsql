"use client";

import { IconPin, IconPinned, IconPinnedFilled, IconPinnedOff } from "@tabler/icons-react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function Sticky({ children }) {

    const ref = useRef();
    const [stick, setStick] = useState(true);

    useEffect(() => {
        const el = ref.current;

        if (!el) return;

        const header = document.querySelector("header");
        const header_height = (header.getBoundingClientRect()).height;

        const el_rect = el.getBoundingClientRect();
        const el_height = el_rect.height;

        if (stick) {
            el.style.top = `${header_height}px`;
            document.documentElement.style.setProperty(
                "--q-table-top",
                `${header_height + el_height}px`
            );
        } else {
            el.style.removeProperty("top");
            document.documentElement.style.setProperty(
                "--q-table-top",
                `${header_height}px`
            );
        }

        // console.log({
        //     element: el,

        //     // Size
        //     width: rect.width,
        //     height: rect.height,

        //     // Position relative to viewport
        //     top: rect.top,
        //     right: rect.right,
        //     bottom: rect.bottom,
        //     left: rect.left,

        //     // Position
        //     x: rect.x,
        //     y: rect.y,

        //     // Coordinates relative to document
        //     documentTop: rect.top + window.scrollY,
        //     documentLeft: rect.left + window.scrollX,
        // });

        // document.documentElement.style.setProperty(
        //     "--q-table-top",
        //     `${rect.bottom}px`
        // );

        return () => {
            document.documentElement.style.setProperty(
                "--q-table-top",
                `${header_height}px`
            );
        }
    }, [stick])

    return (
        <div className={clsx("overflow-y-hiddenf bg-(--background)/90 backdrop-blur-[5px] z-1", stick ? "sticky" : "relative")} ref={ref}>
            <div className="absolute right-5" onClick={() => setStick(prev => !prev)}>
                {!stick ? <IconPinnedOff className="size-5 opacity-[70%]" />
                    : <IconPinned className="size-5 opacity-[70%]" />}
            </div>
            {children}
        </div>
    )
}