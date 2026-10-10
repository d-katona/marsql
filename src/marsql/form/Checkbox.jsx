"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox as Element } from "@/components/ui/checkbox";
import clsx from "clsx";
import { useId } from "react";
import useStyle from "./useStyle";

export default function Checkbox({
    form,
    name,
    label,
    x = true,
    disabled = false,
    className, labelIcon }) {

    const id = useId();
    const styles = useStyle(x, label);

    if (!form || !name) return "*error*";

    return (
        <form.Field name={name}>
            {(field) => {
                const { value, meta } = field.state;
                return (
                    <Field data-invalid={!meta.isValid}
                        style={styles}
                        className={clsx(className, "shadcn-checkbox", "[grid-template-areas:'label_element']")
                        } orientation="horizontal">

                        <Element
                            id={id}
                            name={field.name}
                            style={{ gridArea: "element" }}
                            // value={value ?? ""}
                            // onBlur={field.handleBlur}
                            // onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={!meta.isValid}
                            className={clsx()}
                            disabled={disabled}

                            checked={value ?? false}
                            onCheckedChange={(e) => field.handleChange(e)}
                        />

                        {label ?
                            <FieldLabel htmlFor={id} style={{ gridArea: "label" }}>
                                {labelIcon ? <div className="size-[1em]">{labelIcon}</div> : null}
                                <div>{label}</div>
                            </FieldLabel> : null}
                    </Field>
                )
            }}

        </form.Field >
    )
}