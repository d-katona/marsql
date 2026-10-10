"use client";

import { TableCell, TableHead } from "@/components/ui/table";

export default function TableIndex({ index, header = false }) {

    if (header) return (
        <TableHead className="!text-muted-foreground text-right pr-5 pl-0 w-[50px]">#</TableHead>
    )

    return (
        <TableCell className="tabular-nums text-muted-foreground text-right pr-5 pl-0 text-[0.85em]">{index + 1}.</TableCell>
    )
}