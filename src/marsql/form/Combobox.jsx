"use client";

import {
    Combobox as Element,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { Field, FieldLabel } from "@/components/ui/field";
import clsx from "clsx";
import { useId } from "react";
import useStyle from "./useStyle";

export default function Combobox({
    form,
    name,
    label,
    x = true,
    disabled = false,
    className,
    placeholder = "Select an item",
    data,
    readonly = false }) {

    const id = useId();
    const styles = useStyle(x, label);

    if (!form || !name) return "*error*";

    return (
        <form.Field name={name}>
            {(field) => {
                const { value, meta } = field.state;
                return (
                    <Field data-invalid={!meta.isValid} className={clsx(className)} style={styles}>
                        <FieldLabel htmlFor={id}><div>{label}</div></FieldLabel>
                        <Element
                            autoHighlight
                            value={data?.find((x) => x.value === value) ?? null}
                            items={data}
                            onValueChange={(e) => {
                                // The clear button will have `e` as null
                                field.handleChange(e?.value ?? null);
                            }}
                            readOnly={readonly}
                        >
                            <ComboboxInput placeholder={placeholder} aria-invalid={!meta.isValid} showClear disabled={disabled} />
                            <ComboboxContent>
                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                <ComboboxList>
                                    {(data) => (
                                        <ComboboxItem key={data.value} value={data}>
                                            {data.label}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Element>
                    </Field>
                )
            }}

        </form.Field>
    )
}