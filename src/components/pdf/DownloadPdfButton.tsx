'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ContratoPdf from './ContratoPdf';
import { ContratoCompleto } from '@/types';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((m) => m.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <Button disabled>
        Preparando PDF...
      </Button>
    ),
  }
);

interface DownloadPdfButtonProps {
  data: ContratoCompleto;
}

const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<ContratoPdf data={data} />}
      fileName={`contrato-${data.codigoImovel}-${data.nomeCompleto.toLowerCase().replace(/ /g, '-')}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <Button disabled>Preparando PDF...</Button>
        ) : (
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Download className="mr-2 h-4 w-4" />
            Baixar Contrato PDF
          </Button>
        )
      }
    </PDFDownloadLink>
  );
};

export default DownloadPdfButton;
