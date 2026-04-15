"use client";

import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contratoSchema, ContratoCompleto } from "@/lib/zod-schemas";

export function ContratoFormProvider({ children }: { children: ReactNode }) {
  const methods = useForm<ContratoCompleto>({
    resolver: zodResolver(contratoSchema) as any,
    mode: "onTouched", // Using onTouched as it's better for multi-step forms
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
