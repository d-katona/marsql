"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { join } from "path";
import { toast } from "sonner";

export default function useRecord(
    queryKey,
    queryFn,
    form
) {
    const router = useRouter();
    const path = usePathname();
    const { data, isFetching, isSuccess, refetch } = useQuery({
        queryKey,
        queryFn,
        gcTime: 0
    })

    useEffect(() => {
        if (!data && isSuccess) {
            toast.warning("Record not found!", { position: "top-center" });
            return router.replace(join(path, ".."))
        }
        if (data) form.reset(data);
    }, [data, isSuccess, path, form, router])

    return { data, isSuccess, isFetching, refetch }
}