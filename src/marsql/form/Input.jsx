"use client";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input as Element } from "@/components/ui/input";
import clsx from "clsx";
import { useId } from "react";
import useStyle from "./useStyle";

export default function Input({
    form,
    name,
    label,
    x = true,
    disabled = false,
    className,
    placeholder,
    uppercase = false,
    type = "text",
    tabular = false,
    mono = false,
    labelIcon,
    readonly = false, description }) {

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
                            // value or null back to the form, so zod can handle null in the API at least, test client!
                            onChange={(e) => field.handleChange(e.target.value || null)}
                            aria-invalid={!meta.isValid}
                            autoComplete="off"
                            className={clsx(uppercase && "uppercase", tabular && "tabular-nums", mono && "font-mono")}
                            placeholder={placeholder}
                            disabled={disabled}
                            spellCheck={false}
                            type={type}
                            readOnly={readonly}

                        />
                        {description ? (
                            <>
                                <div></div>
                                <FieldDescription className="">
                                    {description}
                                </FieldDescription></>) : null}
                    </Field>
                )
            }}

        </form.Field>
    )
}