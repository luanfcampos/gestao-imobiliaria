"use client";

import { useState } from "react";
import { useContratoForm } from "./ContratoFormContext";
import { ContratoCompleto } from "@/lib/zod-schemas";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { StepUm } from "./steps/StepUm";
import { StepDois } from "./steps/StepDois";
import { StepTres } from "./steps/StepTres";
import { StepQuatro } from "./steps/StepQuatro";

const stepFields: Record<number, (keyof ContratoCompleto | "documentos")[]> = {
  1: ["codigoImovel", "enderecoCompleto", "tipoImovel"],
  2: ["nomeCompleto", "cpf", "email", "telefone"],
  3: ["valorAluguel", "diaVencimento", "dataInicio", "duracaoMeses", "indiceReajuste"],
  4: [], // Step 4 não tem validação Zod
};

export const ContratoForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedData, setSubmittedData] = useState<ContratoCompleto | null>(null);
  const { trigger, handleSubmit } = useContratoForm();

  const handleNext = async () => {
    // Não validar ao passar para o step de upload
    if (currentStep === 3) {
        setCurrentStep((prev) => prev + 1);
        return;
    }
    const fields = stepFields[currentStep];
    const isValid = await trigger(fields as (keyof ContratoCompleto)[]);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data: ContratoCompleto) => {
    console.log("Form data:", data);
    setSubmittedData(data);
  };

  if (submittedData) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contrato Gerado com Sucesso!</CardTitle>
                <CardDescription>O contrato foi salvo e está pronto para download.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-[var(--color-text-secondary)]">
                    Em breve, o botão para download do PDF aparecerá aqui.
                </p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Novo Contrato de Aluguel</CardTitle>
            <CardDescription>
                Passo {currentStep} de 4 - {
                    currentStep === 1 ? "Detalhes do Imóvel" :
                    currentStep === 2 ? "Informações do Locatário" : 
                    currentStep === 3 ? "Condições do Contrato" : "Upload de Documentos"
                }
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 1 && <StepUm />}
                {currentStep === 2 && <StepDois />}
                {currentStep === 3 && <StepTres />}
                {currentStep === 4 && <StepQuatro />}
            </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            <div>
                {currentStep > 1 && (
                    <Button variant="secondary" onClick={handleBack}>Voltar</Button>
                )}
            </div>
            <div>
                {currentStep < 4 && (
                    <Button onClick={handleNext}>Próximo</Button>
                )}
                {currentStep === 4 && (
                    <Button onClick={handleSubmit(onSubmit)}>Gerar Contrato</Button>
                )}
            </div>
        </CardFooter>
    </Card>
  );
};
