"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { join } from "path";

export default function Actions({ children, add, addLabel = "Add New", clear }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            <div className="flex items-centers q-actions">
                {add ?
                    <Button variant="ghost" onClick={() => router.push(join(pathname, "_"))}>
                        <IconPlus data-icon="inline-start" />
                        {addLabel}
                    </Button> : null}
                {clear ? <Button variant="ghost" onClick={() => clear.reset({})}>
                    <IconRefresh data-icon="inline-start" />
                    Clear Filters
                </Button> : null}
                {children}
            </div>
            <Separator className="mb-2" />
        </>
    )
}