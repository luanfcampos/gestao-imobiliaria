"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  ContratoCompleto,
  stepUmSchema,
  stepDoisSchema,
  stepTresSchema,
} from "@/lib/zod-schemas";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";
import { StepUm } from "./steps/StepUm";
import { StepDois } from "./steps/StepDois";
import { StepTres } from "./steps/StepTres";
import { StepQuatro } from "./steps/StepQuatro";

import DownloadPdfButton from "../pdf/DownloadPdfButton";

const stepSchemas = {
  1: stepUmSchema,
  2: stepDoisSchema,
  3: stepTresSchema,
};

export const ContratoForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedData, setSubmittedData] = useState<ContratoCompleto | null>(
    null
  );
  const { getValues, setError, handleSubmit, clearErrors } = useFormContext<ContratoCompleto>();

  const handleNext = async () => {
    // A transição do passo 3 para o 4 é apenas para navegação, sem validação.
    if (currentStep === 3) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    // Pega o schema de validação para o passo atual.
    const schema = stepSchemas[currentStep as keyof typeof stepSchemas];
    if (!schema) {
      // Se não houver schema, apenas avança (não deve acontecer para os passos 1 e 2).
      setCurrentStep((prev) => prev + 1);
      return;
    }

    clearErrors(); // Limpa erros anteriores antes de validar.

    const data = getValues();
    const result = schema.safeParse(data);

    if (!result.success) {
      // Se a validação falhar, define os erros manualmente para cada campo.
      result.error.issues.forEach((error) => {
        const field = error.path[0] as keyof ContratoCompleto;
        setError(field, {
          type: "manual",
          message: error.message,
        });
      });
      return; // Permanece no passo atual se houver erros
    } else {
      // Se a validação for bem-sucedida, avança para o próximo passo.
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
            <CardContent className="flex justify-center items-center py-8">
               <DownloadPdfButton data={submittedData} />
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
                <div className={currentStep === 1 ? 'block' : 'hidden'}><StepUm /></div>
                <div className={currentStep === 2 ? 'block' : 'hidden'}><StepDois /></div>
                <div className={currentStep === 3 ? 'block' : 'hidden'}><StepTres /></div>
                <div className={currentStep === 4 ? 'block' : 'hidden'}><StepQuatro /></div>
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
