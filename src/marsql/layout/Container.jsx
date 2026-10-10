"use client";

import { Separator } from "@/components/ui/separator";
import clsx from "clsx";

export default function Container({ children, className, separate, wide }) {
    return (
        <>
            <div className={clsx("q-container grid gap-x-3 gap-y-1 items-start ", className, wide ? "w-5xl" : "w-3xl")}>
                {children}
            </div>
            {/* {separate ? <Separator className="my-2" /> : null} */}
            {separate ? <div className="py-2"><Separator /> </div> : null}
        </>
    )
}