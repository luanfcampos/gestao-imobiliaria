import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { ContratoCompleto } from '@/types';

// Registrar fontes (opcional, mas recomendado para consistência)
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
//     { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
//   ]
// });

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
    lineHeight: 1.5,
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    marginVertical: 15,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a202c',
    textTransform: 'uppercase',
  },
  fieldContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  fieldLabel: {
    fontWeight: 'bold',
    width: 100,
    color: '#4a5568',
  },
  fieldValue: {
    flex: 1,
    color: '#2d3748',
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: 'grey',
    fontSize: 9,
  },
});

interface ContratoPdfProps {
  data: ContratoCompleto;
}

const ContratoPdf: React.FC<ContratoPdfProps> = ({ data }) => {
  const generationDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Document title={`Contrato de Locação - ${data.codigoImovel}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>CONTRATO DE LOCAÇÃO RESIDENCIAL</Text>
        <View style={styles.separator} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Imóvel</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Código:</Text>
            <Text style={styles.fieldValue}>{data.codigoImovel}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Endereço:</Text>
            <Text style={styles.fieldValue}>{data.enderecoCompleto}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Tipo:</Text>
            <Text style={styles.fieldValue}>{data.tipoImovel}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Locatário</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nome:</Text>
            <Text style={styles.fieldValue}>{data.nomeCompleto}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>CPF:</Text>
            <Text style={styles.fieldValue}>{data.cpf}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email:</Text>
            <Text style={styles.fieldValue}>{data.email}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Telefone:</Text>
            <Text style={styles.fieldValue}>{data.telefone}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Condições</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Valor:</Text>
            <Text style={styles.fieldValue}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.valorAluguel)}
            </Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Vencimento:</Text>
            <Text style={styles.fieldValue}>Todo dia {data.diaVencimento}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Início:</Text>
            <Text style={styles.fieldValue}>{new Date(data.dataInicio).toLocaleDateString('pt-BR')}</Text>
          </View>
           <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Duração:</Text>
            <Text style={styles.fieldValue}>{data.duracaoMeses} meses</Text>
          </View>
           <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Índice:</Text>
            <Text style={styles.fieldValue}>{data.indiceReajuste}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Documento gerado pelo ImovGest em {generationDate}
        </Text>
      </Page>
    </Document>
  );
};

export default ContratoPdf;
