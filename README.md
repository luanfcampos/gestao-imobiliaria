# 🏠 Sistema de Gestão Imobiliária - ImovGest

Sistema moderno para gestão de imóveis e contratos de aluguel, focado em produtividade e experiência do usuário. 100% frontend, desenvolvido com as tecnologias mais recentes do ecossistema React.

## 📸 Principais Telas

- **Dashboard:** Visão geral com 4 KPIs principais e tabela dos últimos contratos registrados.
- **Listagem de Imóveis:** Grid de dados avançado com filtros globais, ordenação por colunas e paginação.
- **Novo Contrato:** Fluxo de criação de contrato em 4 etapas com validação em tempo real e geração de PDF.
- **Contratos:** Histórico de contratos gerados com visualização de status via badges coloridos.

## 🛠 Stack Técnica

- **Framework:** [Next.js 16.2 (App Router)](https://nextjs.org/)
- **Linguagem:** [TypeScript 5.4](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Gerenciamento de Estado:** React Context API & [React Hook Form 7.51](https://react-hook-form.com/)
- **Validação:** [Zod 3.23](https://zod.dev/)
- **Tabelas:** [TanStack Table 8.17](https://tanstack.com/table)
- **PDF:** [@react-pdf/renderer 4.5.1](https://react-pdf.org/)
- **Ícones:** [Lucide React 0.379](https://lucide.dev/)
- **Temas:** [Next Themes](https://github.com/pacocoursey/next-themes)
- **Testes:** [Playwright 1.59](https://playwright.dev/)

## 🚀 Funcionalidades Implementadas

- ✅ **App Router:** Layouts persistentes e navegação client-side otimizada.
- ✅ **Dark/Light Mode:** Suporte completo a temas com detecção automática do sistema via `next-themes`.
- ✅ **Data Grid:** Tabela de imóveis com busca global, ordenação e paginação robusta.
- ✅ **Formulário Multi-step:** Fluxo dividido em 4 passos (Imóvel, Locatário, Condições e Documentos) com persistência de dados ao navegar entre as etapas.
- ✅ **Validação Rigorosa:** Schemas Zod garantindo a integridade dos dados antes de avançar cada etapa.
- ✅ **Geração de PDF:** Criação dinâmica de contratos em PDF para download imediato.
- ✅ **E2E Testing:** Suíte de testes automatizados cobrindo os fluxos críticos da aplicação.

## 💻 Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd gestao-imobiliaria
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🧪 Testes Automatizados

O projeto conta com uma suíte de testes ponta-a-ponta (E2E) usando Playwright.

**Para rodar os testes:**
```bash
# Instala os navegadores necessários (apenas na primeira vez)
npx playwright install

# Executa os testes (sobe o servidor automaticamente)
npx playwright test
```

**Para visualizar o relatório de testes:**
```bash
npx playwright show-report
```

## 📂 Estrutura de Pastas

```
src/
├── app/             # Rotas e layouts (App Router)
├── components/      # Componentes React
│   ├── contratos/   # Lógica específica do formulário de contrato
│   ├── imoveis/     # Componentes da tabela de imóveis
│   ├── pdf/         # Geradores de PDF
│   ├── shared/      # Sidebar, Header e componentes globais
│   └── ui/          # Componentes de base (Button, Card, Input, etc)
├── data/            # Dados estáticos (imoveis.json)
├── lib/             # Utilitários e Schemas Zod
├── types/           # Definições de tipos TypeScript
└─── e2e/             # Testes E2E (Playwright)
```

## 📖 Documentação Adicional

Para detalhes técnicos sobre o funcionamento interno, padrões de código e fluxos de dados, consulte a **[Arquitetura do Sistema](src/ARCHITECTURE.md)**.

## 🏛 Decisões de Arquitetura

1.  **Server vs Client Components:** As páginas são Server Components por padrão para performance, enquanto componentes interativos (formulários, tabelas, toggles) utilizam `'use client'`.
2.  **Context + FormProvider:** O estado do formulário de contrato é centralizado em um `ContratoFormContext`, permitindo que cada step acesse e valide seus campos de forma isolada mas integrada.
3.  **PDF Client-Side:** A geração de PDF é feita 100% no cliente usando `dynamic import` com `ssr: false`, evitando problemas de hidratação e reduzindo a carga no servidor.
4.  **Variáveis CSS (Tailwind 4):** O sistema de temas utiliza variáveis CSS puras definidas no `:root`, permitindo que os componentes reajam instantaneamente à mudança de tema sem re-renderizações complexas.

