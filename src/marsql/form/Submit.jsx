"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";

export default function Submit({ form, del }) {
    const [open, setOpen] = useState(false);

    return (
        <form.Subscribe selector={(state) => state}>
            {(state) => (
                <>
                    {/* <Separator className="my-2" /> */}
                    <AreYouSure open={open} setOpen={setOpen} del={del} />
                    <div className="flex gap-x-[0.5rem] pb-1">
                        <Button disabled={!state.isDirty || !state.isValid} type="button" variant="ghost" className="" onClick={() => form.handleSubmit()}>
                            <IconDeviceFloppy data-icon="inline-start" />
                            Save
                        </Button>
                        {del ?
                            (<Button variant="ghost" className="text-(--destructive) hover:text-(--destructive)" onClick={() => setOpen(true)}>
                                <IconTrash data-icon="inline-start" type="button" />
                                Delete
                            </Button>) : null}
                    </div>
                    {/* 
                    {!state.isValid && state.isDirty && (
                        <div className="text-sm font-[450] mt-3 flex gap-1 items-center text-slate-600">
                            <div>
                                Some required fields are empty. Please complete them to continue.
                            </div>
                        </div>
                    )} */}
                </>
            )}
        </form.Subscribe>
    );
}

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";

function AreYouSure({ open, setOpen, del }) {
    return (
        <Dialog open={open}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete this record?</DialogTitle>
                    <DialogDescription>
                        This will remove the record from the system.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {/* <DialogClose render={<Button variant="outline">Cancel</Button>} /> */}
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="button" variant="destructive" onClick={() => {
                        del();
                        setOpen(false);
                    }}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}