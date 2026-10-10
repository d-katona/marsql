"use client";

import { Button } from "@/components/ui/button";
import { Calendar as Element } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import clsx from "clsx";
import { format, formatISO, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import { useId, useState } from "react";


export default function Calendar3({ form, name, label, placeholder = "Select date", disabled = false, x }) {
    const id = useId();
    const [open, setOpen] = useState(false)

    if (!form || !name) return "*error*";
    let style = "";
    if (x) {
        style = "grid grid-cols-[100px_auto]"
    }


    return (
        <form.Field name={name}>

            {(field) => {
                // We need value to be a date object

                const { value, meta } = field.state;
                const converted_value = value ? parseISO(value.slice(0, 10)) : null;

                return (
                    <Field data-invalid={!meta.isValid} className={clsx(style)}>
                        <FieldLabel htmlFor={id}><div>{label}</div></FieldLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger render={<Button variant="outline" aria-invalid={!meta.isValid} id="date" className="justify-start font-normal" disabled={disabled}>
                                {converted_value ? format(converted_value, "yyyy-MM-dd") : placeholder}</Button>} />
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start" >
                                <Element
                                    mode="single"
                                    locale={enGB}
                                    selected={converted_value}
                                    defaultMonth={converted_value}
                                    startMonth={new Date(2020, 0)}
                                    endMonth={new Date(2040, 11)}
                                    captionLayout="dropdown"
                                    onSelect={(e) => {
                                        field.handleChange(e ? formatISO(e).slice(0, 10) : null);
                                        setOpen(false);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </Field>)
            }}
        </form.Field>
    )
}