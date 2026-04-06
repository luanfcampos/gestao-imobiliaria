"use client";

import { createContext, useContext, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contratoSchema, ContratoCompleto } from "@/lib/zod-schemas";

// Definir o tipo para o contexto
type ContratoFormContextType = UseFormReturn<ContratoCompleto>;

// Criar o Context com um valor padrão undefined
const ContratoFormContext = createContext<ContratoFormContextType | undefined>(
  undefined
);

// Criar o Provider
export function ContratoFormProvider({ children }: { children: ReactNode }) {
  const methods = useForm<ContratoCompleto>({
    resolver: zodResolver(contratoSchema) as any,
    mode: "onChange",
  });

  return (
    <ContratoFormContext.Provider value={methods}>
      {children}
    </ContratoFormContext.Provider>
  );
}

// Criar o hook customizado para consumir o contexto
export function useContratoForm() {
  const context = useContext(ContratoFormContext);
  if (context === undefined) {
    throw new Error("useContratoForm must be used within a ContratoFormProvider");
  }
  return context;
}
