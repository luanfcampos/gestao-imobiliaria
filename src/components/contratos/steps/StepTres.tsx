import { useContratoForm } from "@/components/contratos/ContratoFormContext";
import { Input } from "@/components/ui/Input";
import { IndiceReajuste } from "@/types";

export const StepTres = () => {
  const { register, formState: { errors } } = useContratoForm();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="valorAluguel" className="text-sm font-medium text-[var(--color-text-label)]">Valor do Aluguel (R$)</label>
        <Input id="valorAluguel" type="number" {...register("valorAluguel")} />
        {errors.valorAluguel && <p className="text-red-500 text-xs mt-1">{errors.valorAluguel.message}</p>}
      </div>
      <div>
        <label htmlFor="diaVencimento" className="text-sm font-medium text-[var(--color-text-label)]">Dia do Vencimento</label>
        <Input id="diaVencimento" type="number" {...register("diaVencimento")} />
        {errors.diaVencimento && <p className="text-red-500 text-xs mt-1">{errors.diaVencimento.message}</p>}
      </div>
      <div>
        <label htmlFor="dataInicio" className="text-sm font-medium text-[var(--color-text-label)]">Data de Início</label>
        <Input id="dataInicio" type="date" {...register("dataInicio")} />
        {errors.dataInicio && <p className="text-red-500 text-xs mt-1">{errors.dataInicio.message}</p>}
      </div>
      <div>
        <label htmlFor="duracaoMeses" className="text-sm font-medium text-[var(--color-text-label)]">Duração (meses)</label>
        <Input id="duracaoMeses" type="number" {...register("duracaoMeses")} />
        {errors.duracaoMeses && <p className="text-red-500 text-xs mt-1">{errors.duracaoMeses.message}</p>}
      </div>
       <div>
        <label htmlFor="indiceReajuste" className="text-sm font-medium text-[var(--color-text-label)]">Índice de Reajuste</label>
        <select id="indiceReajuste" {...register("indiceReajuste")} className="w-full h-10 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]">
          <option value="">Selecione...</option>
          {Object.values(IndiceReajuste).map(indice => (
            <option key={indice} value={indice}>{indice}</option>
          ))}
        </select>
        {errors.indiceReajuste && <p className="text-red-500 text-xs mt-1">{errors.indiceReajuste.message}</p>}
      </div>
    </div>
  );
};
