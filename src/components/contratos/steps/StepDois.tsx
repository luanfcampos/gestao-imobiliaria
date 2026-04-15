import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/Input";

export const StepDois = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="nomeCompleto" className="text-sm font-medium text-[var(--color-text-label)]">Nome Completo</label>
        <Input id="nomeCompleto" {...register("nomeCompleto")} />
        {errors.nomeCompleto?.message && <p className="text-red-500 text-xs mt-1">{String(errors.nomeCompleto.message)}</p>}
      </div>
      <div>
        <label htmlFor="cpf" className="text-sm font-medium text-[var(--color-text-label)]">CPF</label>
        <Input id="cpf" {...register("cpf")} />
        {errors.cpf?.message && <p className="text-red-500 text-xs mt-1">{String(errors.cpf.message)}</p>}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-[var(--color-text-label)]">Email</label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email?.message && <p className="text-red-500 text-xs mt-1">{String(errors.email.message)}</p>}
      </div>
      <div>
        <label htmlFor="telefone" className="text-sm font-medium text-[var(--color-text-label)]">Telefone</label>
        <Input id="telefone" {...register("telefone")} />
        {errors.telefone?.message && <p className="text-red-500 text-xs mt-1">{String(errors.telefone.message)}</p>}
      </div>
    </div>
  );
};
