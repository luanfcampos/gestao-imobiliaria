# Arquitetura do Sistema

Este documento detalha as decisões técnicas, padrões de componentes e fluxos lógicos implementados no projeto ImovGest.

## 1. Fluxo do Formulário de Contrato (Multi-step)

O formulário de criação de contratos é um fluxo sequencial dividido em 4 fases, gerenciado por um estado centralizado.

**Fluxograma Lógico:**
1.  **Step 1 (Imóvel):** Coleta Código, Endereço e Tipo. Valida via `stepUmSchema`.
2.  **Step 2 (Locatário):** Coleta Nome, CPF, Email e Telefone. Valida via `stepDoisSchema`.
3.  **Step 3 (Condições):** Coleta Valor, Vencimento, Data de Início, Duração e Índice de Reajuste. Valida via `stepTresSchema`.
4.  **Step 4 (Documentos):** Upload de arquivos via `react-dropzone`.
5.  **Finalização:** Executa `handleSubmit`, exibe tela de sucesso e libera o botão de download do PDF.

**Gerenciamento de Estado:**
Utilizamos o `FormProvider` do `react-hook-form` dentro do `ContratoFormContext`. Isso permite que componentes netos (os Steps) registrem campos diretamente no formulário global sem a necessidade de "prop drilling".

## 2. Sistema de Temas

O suporte a Light/Dark mode é implementado através da biblioteca `next-themes` em conjunto com variáveis CSS (Tokens de Design).

-   **Mecânica:** O atributo `data-theme` é aplicado na tag `<html>`.
-   **CSS Variables:** As cores não são hardcoded nos componentes. Utilizamos variáveis como `var(--color-surface)`, `var(--color-text-primary)`, etc.
-   **Tailwind Integration:** O Tailwind CSS 4 consome essas variáveis diretamente, permitindo que classes como `bg-[var(--color-surface)]` funcionem perfeitamente em ambos os temas.
-   **Toggle:** O componente `ThemeToggle` utiliza o `resolvedTheme` para alternar entre os estados, garantindo sincronia com a preferência do sistema operacional do usuário.

## 3. Padrões de Componentes

Adotamos uma hierarquia clara de componentes:

-   **UI Components:** Componentes atômicos e reutilizáveis (Button, Badge, Input). Localizados em `src/components/ui`. Seguem o padrão do **Shadcn/UI**, utilizando `forwardRef` para acessibilidade e `class-variance-authority` (CVA) para gerenciamento de variantes.
-   **Shared Components:** Componentes de layout e estrutura (Sidebar, Header). Localizados em `src/components/shared`.
-   **Feature Components:** Componentes acoplados a funcionalidades específicas (ImovelTable, ContratoForm). Localizados em pastas próprias dentro de `src/components`.

## 4. Estratégia de Testes (E2E)

Os testes automatizados com Playwright focam nos "Caminhos Felizes" (Happy Paths) e em regressões visuais críticas.

**Cobertura:**
-   **Navegação:** Garante que a Sidebar destaca o item correto e que os links não causam reloads de página.
-   **Acessibilidade de Tema:** Verifica se o botão de alternância de tema realmente altera o atributo no DOM.
-   **Integridade de Formulário:** Valida se erros aparecem ao tentar pular etapas e se os dados inseridos em um passo persistem ao voltar.
-   **Geração de Documentos:** Confirma que o botão de PDF aparece somente após a conclusão bem-sucedida do formulário.

## 5. Como Adicionar Novas Rotas

Para expandir o sistema, siga este padrão:

1.  **Criar a Pasta:** Crie uma nova pasta em `src/app/` (ex: `src/app/clientes/`).
2.  **Criar o Page:** Adicione um arquivo `page.tsx` (Server Component por padrão).
3.  **Registrar na Sidebar:** Adicione o novo item ao array `navItems` no arquivo `src/components/shared/Sidebar.tsx`.
4.  **Título do Header:** Adicione o mapeamento da rota na função `getTitleFromPathname` em `src/components/shared/Header.tsx`.
