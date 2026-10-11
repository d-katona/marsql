"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { join } from "path";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";

export default function useRecordForm(
    queryKey,
    queryFn,
    schema,
    submit
) {
    const router = useRouter();
    const path = usePathname();

    const form = useForm({
        onSubmit: ({ value }) => submit(value),
        ...(schema && { validators: { onSubmit: schema } })
    })

    const { data, isFetching, isSuccess, refetch, isError } = useQuery({
        queryKey,
        queryFn,
        gcTime: 0
    })

    useEffect(() => {
        if (isError) {
            return router.replace(join(path, ".."))
        }
        if (!data && isSuccess) {
            toast.warning("Record not found!", { position: "top-center" });
            return router.replace(join(path, ".."))
        }
        if (data) form.reset(data);
    }, [data, isSuccess, path, form, router, isError])

    return { form, data, isSuccess, isFetching, refetch }
}