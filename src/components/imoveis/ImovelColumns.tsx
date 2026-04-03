"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Imovel, StatusImovel } from "@/types"
import { Badge } from "@/components/ui/Badge"

export const columns: ColumnDef<Imovel>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "cidade",
    header: "Cidade",
  },
  {
    accessorKey: "bairro",
    header: "Bairro",
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("valor"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as StatusImovel
      let variant: "green" | "blue" | "yellow" | "gray" | "default" = "default"

      switch (status) {
        case StatusImovel.DISPONIVEL:
          variant = "green"
          break
        case StatusImovel.ALUGADO:
          variant = "blue"
          break
        case StatusImovel.MANUTENCAO:
          variant = "yellow"
          break
        case StatusImovel.RESERVADO:
          variant = "gray"
          break
      }

      return <Badge variant={variant}>{status}</Badge>
    },
  },
]
