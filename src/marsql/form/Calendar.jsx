"use client";
import { Calendar as Element } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import clsx from "clsx";
import { format, formatISO, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import { useId, useRef, useState } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { CalendarIcon } from "lucide-react"
import useStyle from "./useStyle";

export default function Calendar({
    form,
    name,
    label,
    x = true,
    disabled = false,
    className,
    placeholder = "Select date" }) {

    const id = useId();
    const [open, setOpen] = useState(false)
    const ref = useRef();
    const styles = useStyle(x, label);

    if (!form || !name) return "*error*";

    return (
        <form.Field name={name}>

            {(field) => {
                // We need value to be a date object

                const { value, meta } = field.state;
                // const converted_value = value ? parseISO(value.slice(0, 10)) : null;
                let converted_value;
                let converted_value_f;
                try {
                    converted_value = value ? parseISO(value.slice(0, 10)) : null;
                    converted_value_f = converted_value ? format(converted_value, "yyyy-MM-dd") : "";
                } catch (e) {
                    converted_value = null;
                    converted_value_f = "";
                }

                return (
                    <Field data-invalid={!meta.isValid} className={clsx(className)} style={styles}>
                        <FieldLabel htmlFor={id}><div>{label}</div></FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                readOnly
                                id={id}
                                className="cursor-default"
                                // value={inputValue ?? ""}
                                // value={converted_value ? format(converted_value, "yyyy-MM-dd") : ""}
                                value={converted_value_f ?? ""}
                                placeholder={placeholder}
                                aria-invalid={!meta.isValid}
                                ref={ref}
                                tabIndex={-1}
                                // onChange={(e) => field.handleChange(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "ArrowDown") {
                                        e.preventDefault()
                                        setOpen(true)
                                    }
                                }}
                                onFocus={(e) => {
                                    e.preventDefault();
                                    ref.current.blur();

                                }}
                                disabled={disabled}
                                // onBlur={(e) => {
                                //     try {
                                //         const d = parseISO(e.target.value);
                                //         const f = formatISO(d).slice(0, 10)
                                //         field.handleChange(f);
                                //         // setInputValue(f)
                                //     } catch (e) {
                                //         field.handleChange(null);
                                //         // setInputValue("")
                                //     }
                                // }}

                                onClick={() => setOpen(true)}
                            />
                            <InputGroupAddon align="inline-end">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger render={<InputGroupButton id="date-picker" variant="ghost" size="icon-xs" aria-label="Select date" disabled={disabled}><CalendarIcon /><span className="sr-only">Select date</span></InputGroupButton>} />
                                    <PopoverContent
                                        className="w-auto overflow-hidden p-0"
                                        align="end"
                                        alignOffset={-8}
                                        sideOffset={10}
                                    >
                                        <Element
                                            mode="single"
                                            locale={enGB}
                                            selected={converted_value}
                                            defaultMonth={converted_value}
                                            // onMonthChange={setMonth}
                                            startMonth={new Date(1900, 0)}
                                            endMonth={new Date(2100, 11)}
                                            captionLayout="dropdown"
                                            onSelect={(e) => {
                                                // setDate(date)
                                                // setValue(formatDate(date))
                                                field.handleChange(e ? formatISO(e).slice(0, 10) : null);
                                                setOpen(false)
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>)
            }}
        </form.Field>
    )
}





// function formatDate(date) {
//     if (!date) {
//         return ""
//     }

//     return date.toLocaleDateString("en-US", {
//         day: "2-digit",
//         month: "long",
//         year: "numeric",
//     })
// }

// function isValidDate(date) {
//     if (!date) {
//         return false
//     }
//     return !isNaN(date.getTime())
// }

// export function DatePickerInput() {
//     const [open, setOpen] = React.useState(false)
//     const [date, setDate] = React.useState < Date | undefined > (
//         new Date("2025-06-01")
//     )
//     const [month, setMonth] = React.useState < Date | undefined > (date)
//     const [value, setValue] = React.useState(formatDate(date))

//     return (
//         <Field className="mx-auto w-48">
//             <FieldLabel htmlFor="date-required">Subscription Date</FieldLabel>
//             <InputGroup>
//                 <InputGroupInput
//                     id="date-required"
//                     value={value}
//                     placeholder="June 01, 2025"
//                     onChange={(e) => {
//                         const date = new Date(e.target.value)
//                         setValue(e.target.value)
//                         if (isValidDate(date)) {
//                             setDate(date)
//                             setMonth(date)
//                         }
//                     }}
//                     onKeyDown={(e) => {
//                         if (e.key === "ArrowDown") {
//                             e.preventDefault()
//                             setOpen(true)
//                         }
//                     }}
//                 />
//                 <InputGroupAddon align="inline-end">
//                     <Popover open={open} onOpenChange={setOpen}>
//                         <PopoverTrigger render={<InputGroupButton id="date-picker" variant="ghost" size="icon-xs" aria-label="Select date"><CalendarIcon /><span className="sr-only">Select date</span></InputGroupButton>} />
//                         <PopoverContent
//                             className="w-auto overflow-hidden p-0"
//                             align="end"
//                             alignOffset={-8}
//                             sideOffset={10}
//                         >
//                             <Calendar
//                                 mode="single"
//                                 selected={date}
//                                 month={month}
//                                 onMonthChange={setMonth}
//                                 onSelect={(date) => {
//                                     setDate(date)
//                                     setValue(formatDate(date))
//                                     setOpen(false)
//                                 }}
//                             />
//                         </PopoverContent>
//                     </Popover>
//                 </InputGroupAddon>
//             </InputGroup>
//         </Field>
//     )
// }
