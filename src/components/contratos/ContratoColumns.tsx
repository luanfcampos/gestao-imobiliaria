"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

export type ContratoMock = {
  id: string
  imovel: string
  locatario: string
  valorMensal: number
  status: "Ativo" | "Pendente" | "Encerrado"
}

export const columns: ColumnDef<ContratoMock>[] = [
  {
    accessorKey: "id",
    header: "Código",
  },
  {
    accessorKey: "imovel",
    header: "Imóvel",
  },
  {
    accessorKey: "locatario",
    header: "Locatário",
  },
  {
    accessorKey: "valorMensal",
    header: "Valor Mensal",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("valorMensal"))
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
      const status = row.getValue("status") as ContratoMock["status"]
      let variant: "emerald" | "amber" | "red" = "amber"

      switch (status) {
        case "Ativo":
          variant = "emerald"
          break
        case "Pendente":
          variant = "amber"
          break
        case "Encerrado":
          variant = "red"
          break
      }

      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contract = row.original

      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )
    },
  },
]