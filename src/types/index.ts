// src/types/index.ts

export enum TipoImovel {
  APARTAMENTO = "Apartamento",
  CASA = "Casa",
  TERRENO = "Terreno",
  COMERCIAL = "Comercial",
}

export enum StatusImovel {
  DISPONIVEL = "Disponível",
  ALUGADO = "Alugado",
  VENDIDO = "Vendido",
}

export enum IndiceReajuste {
  IPCA = "IPCA",
  IGPM = "IGP-M",
  INCC = "INCC",
}

export type Imovel = {
  id: string;
  nome: string;
  tipo: TipoImovel;
  cidade: string;
  bairro: string;
  valor: number;
  status: StatusImovel;
  area: number; // em m²
  quartos: number;
  vagas: number;
};

export type Contrato = {
  id: string;
  codigoImovel: string;
  enderecoCompleto: string;
  tipoImovel: TipoImovel;
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  valorAluguel: number;
  diaVencimento: number;
  dataInicio: Date;
  duracaoMeses: number;
  indiceReajuste: IndiceReajuste;
};
