import { Imovel } from "@/types";
import { columns } from "@/components/imoveis/ImovelColumns";
import { ImovelTable } from "@/components/imoveis/ImovelTable";
import imoveisData from "@/data/imoveis.json";

// This is a Server Component, so we can fetch data directly.
// In a real app, this would be a database call.
async function getImoveis(): Promise<Imovel[]> {
  // We can add a delay here to simulate network latency
  // await new Promise(resolve => setTimeout(resolve, 1000));
  return imoveisData as Imovel[];
}

export default async function ImoveisPage() {
  const data = await getImoveis();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Listagem de Imóveis</h1>
      <ImovelTable columns={columns} data={data} />
    </div>
  );
}
