import { z } from "zod";
import { TipoImovel, IndiceReajuste } from "@/types";

// Step 1: Detalhes do Imóvel
export const stepUmSchema = z.object({
  codigoImovel: z.string().min(1, "Código do imóvel é obrigatório"),
  enderecoCompleto: z.string().min(10, "Endereço completo é obrigatório"),
  tipoImovel: z.nativeEnum(TipoImovel, {
    message: "Selecione um tipo de imóvel válido.",
  }),
});

// Step 2: Informações do Locatário
export const stepDoisSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
});

// Step 3: Condições do Contrato
export const stepTresSchema = z.object({
  valorAluguel: z.coerce.number({ message: "Deve ser um número" }).positive("O valor deve ser positivo"),
  diaVencimento: z.coerce.number({ message: "Deve ser um número" }).int().min(1).max(31, "Dia inválido"),
  dataInicio: z.coerce.date({
    message: "Selecione uma data de início válida.",
  }),
  duracaoMeses: z.coerce.number({ message: "Deve ser um número" }).int().positive("A duração deve ser positiva"),
  indiceReajuste: z.nativeEnum(IndiceReajuste, {
    message: "Selecione um índice válido.",
  }),
});

// Schema completo unindo os steps
export const contratoSchema = stepUmSchema.merge(stepDoisSchema).merge(stepTresSchema);

// Tipos inferidos dos schemas para uso no TypeScript
export type ContratoStepUm = z.infer<typeof stepUmSchema>;
export type ContratoStepDois = z.infer<typeof stepDoisSchema>;
export type ContratoStepTres = z.infer<typeof stepTresSchema>;
export type ContratoCompleto = z.infer<typeof contratoSchema>;
