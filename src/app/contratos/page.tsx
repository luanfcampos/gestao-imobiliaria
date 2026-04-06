"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { columns, ContratoMock } from "@/components/contratos/ContratoColumns";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";


const mockContratos: ContratoMock[] = [
  {
    id: "CTR-001",
    imovel: "Apto 301, Bloco A",
    locatario: "Carlos Silva",
    valorMensal: 2500,
    status: "Ativo",
  },
  {
    id: "CTR-002",
    imovel: "Casa 12, Rua das Flores",
    locatario: "Maria Oliveira",
    valorMensal: 4200,
    status: "Pendente",
  },
  {
    id: "CTR-003",
    imovel: "Sala 505, Edf. Central",
    locatario: "Empresa XYZ",
    valorMensal: 1800,
    status: "Encerrado",
  },
  {
    id: "CTR-004",
    imovel: "Apto 1204, Orla Mar",
    locatario: "Joana Pereira",
    valorMensal: 3100,
    status: "Ativo",
  },
  {
    id: "CTR-005",
    imovel: "Terreno Lote 23",
    locatario: "Investimentos ABC",
    valorMensal: 800,
    status: "Pendente",
  },
];


export default function ContratosPage() {
    const table = useReactTable({
        data: mockContratos,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contratos</h1>
        <Link href="/contratos/novo">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Contrato
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Contratos</CardTitle>
          <CardDescription>Gerencie todos os contratos de aluguel e venda.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-[var(--color-border)]">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-b-[var(--color-border)]">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-[var(--color-text-secondary)]">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-b-[var(--color-border)] hover:bg-[var(--color-surface)]"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Nenhum contrato encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
