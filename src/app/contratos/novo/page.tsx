"use client";

import { ContratoFormProvider } from "@/components/contratos/ContratoFormContext";
import { ContratoForm } from "@/components/contratos/ContratoForm";

export default function NovoContratoPage() {
  return (
    <ContratoFormProvider>
      <ContratoForm />
    </ContratoFormProvider>
  );
}
