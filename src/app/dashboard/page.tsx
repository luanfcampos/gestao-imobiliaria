import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { DollarSign, Building2, FileText, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Visão Geral</h1>
        <p className="text-[var(--color-text-secondary)]">
          Acompanhe as métricas principais do seu negócio.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-[var(--color-text-secondary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231,89</div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              +20.1% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Imóveis</CardTitle>
            <Building2 className="h-4 w-4 text-[var(--color-text-secondary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.250</div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              +50 imóveis novos este mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
            <FileText className="h-4 w-4 text-[var(--color-text-secondary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">873</div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              +12% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
            <TrendingUp className="h-4 w-4 text-[var(--color-text-secondary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.8%</div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              +1.5% desde o último trimestre
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Aqui poderia entrar um gráfico ou uma tabela de atividades recentes */}
    </div>
  );
}
