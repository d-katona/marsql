"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";

const spanClasses = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
}

export default function Block({ children, variant, span = 1, end = false, className, separate = false }) {
    // separate is preferred

    if (variant === "separator" || separate) return (
        <div className="self-stretch">
            <Separator orientation="vertical" className=" h-full" />
        </div>
    )

    return (
        <div className={clsx("grid gap-1", spanClasses[span], end && "self-end", className)}>
            {children}
        </div>
    )
}