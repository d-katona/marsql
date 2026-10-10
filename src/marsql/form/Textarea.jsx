"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea as Element } from "@/components/ui/textarea";
import clsx from "clsx";
import { useId } from "react";
import useStyle from "./useStyle";

export default function Textarea({
    form,
    name,
    label,
    x = true,
    disabled = false,
    className,
    placeholder,
    uppercase = false,
    tabular = false,
    mono = false, labelIcon }) {

    const id = useId();
    const styles = useStyle(x, label);

    if (!form || !name) return "*error*";

    return (
        <form.Field name={name}>
            {(field) => {
                const { value, meta } = field.state;
                return (
                    <Field data-invalid={!meta.isValid} className={clsx(className)} style={styles}>
                        {label ?
                            <FieldLabel htmlFor={id}>
                                {labelIcon ? <div className="size-[1em]">{labelIcon}</div> : null}
                                <div>{label}</div>
                            </FieldLabel> : null}
                        <Element
                            id={id}
                            name={field.name}
                            value={value ?? ""}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={!meta.isValid}
                            autoComplete="off"
                            className={clsx(uppercase && "uppercase", tabular && "tabular-nums", mono && "font-mono")}
                            placeholder={placeholder}
                            disabled={disabled}
                            spellCheck={false}
                        />
                    </Field>
                )
            }}

        </form.Field>
    )
}