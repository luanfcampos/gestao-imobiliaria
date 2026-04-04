import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { DollarSign, Building2, FileText, TrendingUp } from "lucide-react";

const kpiData = [
  {
    title: "Receita Mensal",
    value: "R$ 45.231,89",
    change: "+20.1% em relação ao mês passado",
    icon: DollarSign,
    iconBgColor: "bg-[var(--color-success)]/20",
    iconColor: "text-[var(--color-success)]",
  },
  {
    title: "Total de Imóveis",
    value: "1.250",
    change: "+50 imóveis novos este mês",
    icon: Building2,
    iconBgColor: "bg-[var(--color-info)]/20",
    iconColor: "text-[var(--color-info)]",
  },
  {
    title: "Contratos Ativos",
    value: "873",
    change: "+12% em relação ao mês passado",
    icon: FileText,
    iconBgColor: "bg-[var(--color-violet)]/20",
    iconColor: "text-[var(--color-violet)]",
  },
  {
    title: "Taxa de Ocupação",
    value: "92.8%",
    change: "+1.5% desde o último trimestre",
    icon: TrendingUp,
    iconBgColor: "bg-[var(--color-alert)]/20",
    iconColor: "text-[var(--color-alert)]",
  },
];

const lastContracts = [
    { id: 'CTR-001', imovel: 'Apto 301, Bloco A', locatario: 'Carlos Silva', valor: 2500, status: 'Ativo' },
    { id: 'CTR-002', imovel: 'Casa 12, Rua das Flores', locatario: 'Maria Oliveira', valor: 4200, status: 'Ativo' },
    { id: 'CTR-003', imovel: 'Sala 505, Edf. Central', locatario: 'Empresa XYZ', valor: 1800, status: 'Finalizado' },
    { id: 'CTR-004', imovel: 'Apto 1204, Orla Mar', locatario: 'Joana Pereira', valor: 3100, status: 'Ativo' },
    { id: 'CTR-005', imovel: 'Terreno Lote 23', locatario: 'Investimentos ABC', valor: 800, status: 'Pendente' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl">Visão Geral</h1>
        <p className="text-[var(--color-text-secondary)]">
          Acompanhe as métricas principais do seu negócio.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <div className={`p-2 rounded-lg ${kpi.iconBgColor}`}>
                <kpi.icon className={`h-4 w-4 ${kpi.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Últimos Contratos</CardTitle>
            <CardDescription>
                Os 5 contratos mais recentes registrados no sistema.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className="border-b-[var(--color-border)]">
                        <TableHead className="text-[var(--color-text-secondary)]">Código</TableHead>
                        <TableHead className="text-[var(--color-text-secondary)]">Imóvel</TableHead>
                        <TableHead className="text-[var(--color-text-secondary)]">Locatário</TableHead>
                        <TableHead className="text-right text-[var(--color-text-secondary)]">Valor (R$)</TableHead>
                        <TableHead className="text-center text-[var(--color-text-secondary)]">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {lastContracts.map(contract => (
                        <TableRow key={contract.id} className="border-b-0">
                            <TableCell className="font-medium">{contract.id}</TableCell>
                            <TableCell>{contract.imovel}</TableCell>
                            <TableCell>{contract.locatario}</TableCell>
                            <TableCell className="text-right">{contract.valor.toFixed(2)}</TableCell>
                            <TableCell className="text-center">
                                <Badge variant={
                                    contract.status === 'Ativo' ? 'emerald' : contract.status === 'Finalizado' ? 'zinc' : 'amber'
                                }>{contract.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
