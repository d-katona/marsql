"use client";

import Input from "@/marsql/ui/input";
import { useForm } from "@tanstack/react-form";

export default function Home() {
  const form = useForm();

  return (
    <div>


      <Input form={form} name="name" label="test" />

    </div>
  )
}