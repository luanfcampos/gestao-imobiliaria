import { useContratoForm } from "@/components/contratos/ContratoFormContext";
import { Input } from "@/components/ui/Input";
import { TipoImovel } from "@/types";

export const StepUm = () => {
  const { register, formState: { errors } } = useContratoForm();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="codigoImovel" className="text-sm font-medium text-[var(--color-text-label)]">Código do Imóvel</label>
        <Input id="codigoImovel" {...register("codigoImovel")} />
        {errors.codigoImovel && <p className="text-red-500 text-xs mt-1">{errors.codigoImovel.message}</p>}
      </div>
      <div>
        <label htmlFor="enderecoCompleto" className="text-sm font-medium text-[var(--color-text-label)]">Endereço Completo</label>
        <Input id="enderecoCompleto" {...register("enderecoCompleto")} />
        {errors.enderecoCompleto && <p className="text-red-500 text-xs mt-1">{errors.enderecoCompleto.message}</p>}
      </div>
      <div>
        <label htmlFor="tipoImovel" className="text-sm font-medium text-[var(--color-text-label)]">Tipo de Imóvel</label>
        <select id="tipoImovel" {...register("tipoImovel")} className="w-full h-10 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]">
          <option value="">Selecione...</option>
          {Object.values(TipoImovel).map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
        {errors.tipoImovel && <p className="text-red-500 text-xs mt-1">{errors.tipoImovel.message}</p>}
      </div>
    </div>
  );
};
